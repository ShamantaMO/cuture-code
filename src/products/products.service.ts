import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { UpdateProductsDto } from './dtos/update-products.dto';
import { UsersDecoratorDTO } from '../users/dtos/users-decorator.dto';
import { CreateProdutsDto } from './dtos/createproducts.dto';
import { Product, User } from '../entities';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}


  async create(body: CreateProdutsDto) {
    if (await this.findName(body.name)) {
      throw new BadRequestException('Produto já existe');
    }
    const newProduct = this.productsRepository.create(body);

    console.log(newProduct)
    try {
      return await this.productsRepository.save(newProduct);
    } catch (error) {
      console.error(error);
      throw new HttpException('Falha ao criar o produto', 500);
    }
  }
  
  async reward(productId: number, userDeco: UsersDecoratorDTO) {
    const product = await this.productsRepository.findOne({
      where: { id: productId, inStock: true }
    });
    console.log(product)

    const user = await this.usersRepository.findOne({
      where: { id: userDeco.userId },
      relations: ['productsPurchased'],
    });

    if (!user) {
      throw new NotFoundException(`Usuário ${userDeco.userId} não encontrado`);
    }

    if (!product || !product.inStock) {
      throw new NotFoundException(
        `Produto com o id: ${productId} não encontrado ou sem estoque`,
      );
    }

    if (user.coins < product.price) {
      throw new BadRequestException('Moedas insuficientes para comprar o produto');
    }

    user.coins -= product.price;
    user.productsPurchased.push(product);

    product.inStock = false;

    try {
      await this.usersRepository.save(user);
      await this.productsRepository.save(product);

      return { message: 'Produto comprado com sucesso', user };
    } catch (error) {
      console.error(error);
      throw new HttpException('Falha ao processar a compra', 500);
    }
  }

  
  async productById(id: number) {
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Produto com o id: ${id} não encontrado`);
    }

    return product;
  }

  
  async findName(name: string) {
    return this.productsRepository.findOne({ where: { name } });
  }

  
  async update(id: number, body: UpdateProductsDto) {
    const product = await this.productById(id);

    try {
      await this.productsRepository.update(id, body);
      return { message: 'Produto atualizado com sucesso', product: { ...product, ...body } };
    } catch (error) {
      console.error(error);
      throw new HttpException('Falha ao atualizar o produto', 500);
    }
  }

  async delete(id: number) {
    const product = await this.productById(id);

    try {
      await this.productsRepository.softDelete(product.id);
      return { message: 'Produto excluído com sucesso' };
    } catch (error) {
      console.error(error);
      throw new HttpException('Falha ao excluir o produto', 500);
    }
  }

  async findAllProducts(
    page: number,
    limit: number,
    price?: number,
    name?: string,
  ) {
    try {

      if(!page || !limit){
        throw new BadRequestException('Página e limite obrigatórios')
      }
      const pageOptions = { skip: (page - 1) * limit, take: limit };

      const products = price
        ? await this.productsRepository.find({
            where: { price },
            ...pageOptions,
          })
        : name
          ? await this.productsRepository.find({
              where: { name: ILike(`%${name}%`) },
              ...pageOptions,
            })
          : price && name
            ? await this.productsRepository.find({
                where: { price, name },
                ...pageOptions,
              })
            : await this.productsRepository.find({ ...pageOptions });

      return {
        page,
        limit,
        total: products.length,
        data: products,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }
}