import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { productsRepositoryMock } from 'src/testing/product/products-repository.mock';
import { userRepositoryMock } from 'src/testing/user/user-repository.mock';
import { createProductMock } from 'src/testing/product/create-product.mock';
import { userDecoratorMock } from 'src/testing/user/user-decorator.mock';
import { updateProductMock } from 'src/testing/product/update-product.mock';

describe('ProductsService', () => {
  let productService: ProductsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, productsRepositoryMock, userRepositoryMock],
    }).compile();

    productService = module.get<ProductsService>(ProductsService);
  });

  it('deve estar definido', () => {
    expect(productService).toBeDefined();
  });

  describe('Criar', () => {
    it(' criar um produto', async () => {
      jest.spyOn(productService, 'findName').mockResolvedValueOnce(null);
      const product = await productService.create(createProductMock);

      expect(product).toHaveProperty('id');
    });

    it('recompensa', async () => {
      const reward = await productService.reward(7, userDecoratorMock);

      expect(reward).toHaveProperty('message');
    });
  });

  describe('Ler', () => {
    it('encontrar um produto pelo ID', async () => {
      const product = await productService.productById(7);

      expect(product.name).toContain('Productivity Planner');
      expect(product.deleteAt).toBeNull();
    });

    it('encontrar o produto pelo nome', async () => {
      const product = await productService.findName('Productivity Planner');

      expect(product).toHaveProperty('id');
      expect(product.deleteAt).toBeNull();
    });
  });

  describe('Atualizar', () => {
    it('atualizar o produto', async () => {
      const product = await productService.update(7, updateProductMock);
      console.log(product);
      expect(product['price']).toEqual(updateProductMock.price);
      expect(product['deleteAt']).toBeNull();
    });
  });

  describe('Excluir', () => {
    it('deve excluir o produto', async () => {
      const product = await productService.delete(4);

      expect(product).toHaveProperty('message');
      console.log(product);
    });
  });
});
