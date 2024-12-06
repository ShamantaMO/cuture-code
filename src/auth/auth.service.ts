import { BadRequestException, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginDto } from "src/auth/dtos/login.dto";
import { userRegisterDto } from "src/auth/dtos/user-register.dto";
import { Product, User } from "src/entities";
import { UsersService } from "src/users/users.service";
import { ILike, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private userService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async register(body: userRegisterDto) {
    try {
      console.log('REGISTER');
      if (await this.userService.findByEmail(body.email)) {
        throw new BadRequestException('Usuário já existe');
      }

      const newUser = this.usersRepository.create(body);

      await this.usersRepository.save(newUser);

      return newUser;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async login(body: LoginDto) {
    try {
      console.log('LOGIN');
      const user = await this.findOne(body.email);
      console.log(user);
      if (!user || !(await bcrypt.compare(body.password, user.password))) {
        throw new UnauthorizedException('Credencial invalida');
      }

      const tokenPayload = {
        userId: user.id,
        userEmail: user.email,
        userRole: user.role,
        iss: 'Culture Code User',
        aud: 'users from Culture Code',
      };

      return { access_token: await this.jwtService.signAsync(tokenPayload) };
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(email: string) {
    try {
      return await this.usersRepository.findOne({
        where: { email },
        select: { id: true, email: true, password: true, role: true },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
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