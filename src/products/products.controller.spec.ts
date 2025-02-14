import { Test, TestingModule } from "@nestjs/testing";
import { ProductsController } from "./products.controller";
import { productServiceMock } from "../testing/product/product-sevice.mock";
import { AuthGuard } from "../guards/auth.guard";
import { authGuardMock } from "../testing/auth/auth-guard.mock";
import { createProductMock } from "../testing/product/create-product.mock";
import { userDecoratorMock } from "../testing/user/user-decorator.mock";
import { updateProductMock } from "../testing/product/update-product.mock";

describe('ProductsController', () => {
  let productController: ProductsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [productServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    productController = module.get<ProductsController>(ProductsController);
  });

  it('deve estar definido', () => {
    expect(productController).toBeDefined();
  });

  describe('Criar', () => {
    it('criar um produto', async () => {
      const newProduct = await productController.create(createProductMock);

      console.log('Criar', newProduct);

      expect(newProduct).toHaveProperty('id');
      expect(newProduct.deleteAt).toBeNull();
    });

    it('recompensar um produto', async () => {
      const rewardProduct = await productController.reward(
        7,
        userDecoratorMock,
      );

      console.log('Recompensa', rewardProduct);

      expect(rewardProduct).toHaveProperty('message');
    });
  });

  describe('Ler', () => {
    const productId = 4;
    it('encontrar um produto pelo ID', async () => {
      const product = await productController.productById(productId);

      console.log('Produto pelo ID', product);

      expect(product.name).toEqual('Wireless Keyboard');
      expect(product.deleteAt).toBeNull();
    });
  });
  
  describe('Atualizar', () => {
    it('atualizar um produto', async () => {
      const product = await productController.update(3, updateProductMock);

      console.log('Atualizar', product);

      expect(product['price']).toEqual(updateProductMock.price);
    });
  });

  describe('Excluir', () => {
    const productId = 8;
    it('excluir um produto', async () => {
      const product = await productController.delete(productId);

      console.log('Excluir', product);

      expect(product.message).toEqual('Produto excluído com sucesso');
    });
  });
});
