import { Test, TestingModule } from "@nestjs/testing";
import { ProductsService } from "./products.service";
import { userDecoratorMock } from "../testing/user/user-decorator.mock";
import { productsRepositoryMock } from "../testing/product/products-repository.mock";
import { userRepositoryMock } from "../testing/user/user-repository.mock";
import { createProductMock } from "../testing/product/create-product.mock";
import { updateProductMock } from "../testing/product/update-product.mock";
import { productsMock } from "../testing/product/products-mock";

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
      const reward = await productService.reward(productsMock[3].id, userDecoratorMock);

      expect(reward).toHaveProperty('message');
    });
  });

  describe('Ler', () => {
    it('encontrar um produto pelo ID', async () => {
      const product = await productService.productById(7);

      expect(product.name).toContain('Noise-Canceling Headphones');
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
      const result = await productService.update(7, updateProductMock);
      console.log(result);
      expect(result['product']['price']).toEqual(updateProductMock.price);
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
