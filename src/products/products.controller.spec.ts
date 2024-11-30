import { Test, TestingModule } from "@nestjs/testing";
import { ProductsController } from "./products.controller";
import { productServiceMock } from "src/testing/product/product-sevice.mock";
import { AuthGuard } from "src/guards/auth.guard";
import { authGuardMock } from "src/testing/auth/auth-guard.mock";
import { createProductMock } from "src/testing/product/create-product.mock";
import { userDecoratorMock } from "src/testing/user/user-decorator.mock";
import { updateProductMock } from "src/testing/product/update-product.mock";

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
    it('encontrar um produto pelo ID', async () => {
      const product = await productController.productById(4);

      console.log('Produto pelo ID', product);

      expect(product.name).toEqual('Standing Desk Converter');
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
    it('excluir um produto', async () => {
      const product = await productController.delete(8);

      console.log('Excluir', product);

      expect(product.message).toEqual('Produto excluído');
    });
  });
});
