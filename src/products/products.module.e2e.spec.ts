import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ProductsModule } from "./products.module";
import { productsRepositoryMock } from "src/testing/product/products-repository.mock";
import { userRepositoryMock } from "src/testing/user/user-repository.mock";
import { AuthGuard } from "src/guards/auth.guard";
import { authGuardMock } from "src/testing/auth/auth-guard.mock";
import { request } from "http";
import { createProductMock } from "src/testing/product/create-product.mock";
import { productsMock } from "src/testing/product/products-mock";
import { updateProductMock } from "src/testing/product/update-product.mock";

describe('Módulo de Produtos', () => {
    let app: INestApplication;
  
    beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [ProductsModule],
      })
        .overrideProvider(productsRepositoryMock.provide)
        .useValue(productsRepositoryMock.useValue)
        .overrideProvider(userRepositoryMock.provide)
        .useValue(userRepositoryMock.useValue)
        .overrideGuard(AuthGuard)
        .useValue(authGuardMock)
        .compile();
  
      app = module.createNestApplication();
      app.useGlobalPipes(new ValidationPipe());
  
      app.init();
    });
  
    afterAll(async () => {
      app.close();
    });
  
    it('deve estar definido', () => {
      expect(app).toBeDefined();
    });
  
    describe('Criar', () => {
      it('deve criar um produto', async () => {
          jest.spyOn(productsRepositoryMock.useValue, 'findOne').mockResolvedValueOnce(null);
  
          const response = await request(app.getHttpServer()).post('/products/create').send(createProductMock);
  
          expect(response.statusCode).toEqual(201);
          expect(response.body).toHaveProperty('id');
      });
  
      it('deve recompensar um produto', async () => {
          const response = await request(app.getHttpServer()).post(`/products/reward/${productsMock[3].id}`);
  
          expect(response.statusCode).toEqual(201);
          expect(response.body).toHaveProperty('message');
      });
    });
  
    describe('Ler', () => {
      it('deve encontrar um produto pelo ID', async () => {
          const response = await request(app.getHttpServer()).get(`/products/${productsMock[0].id}`);
  
          expect(response.statusCode).toEqual(200);
          expect(response.body['name']).toEqual('Productivity Planner');
      });
    });
  
    describe('Atualizar', () => {
      it('deve atualizar um produto', async () => {
          const response = await request(app.getHttpServer()).patch(`/products/${productsMock[1].id}`).send(updateProductMock);
  
          console.log('Erro', response.error);
          console.log('Código de Status', response.statusCode);
  
          expect(response.statusCode).toEqual(200);
          expect(response.body['price']).toEqual(updateProductMock.price);
      });
    });
  
    describe('Excluir', () => {
      it('deve excluir um produto', async () => {
          const response = await request(app.getHttpServer()).delete(`/products/${productsMock[0].id}`);
  
          expect(response.statusCode).toEqual(200);
          expect(response.body).toHaveProperty('message');
      });
    });
  });
  