import { INestApplication, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";
import { authGuardMock } from "../testing/auth/auth-guard.mock";
import { createJewelsMock } from "../testing/jewels/create-jewels.mock";
import { jewelsRepositoryMock } from "../testing/jewels/jewels-repository.mock";
import { jewelsMock } from "../testing/jewels/jewels.mock";
import { updateJewelsMock } from "../testing/jewels/update-jewels.mock";
import { userRepositoryMock } from "../testing/user/user-repository.mock";
import { usersMock } from "../testing/users.mock";
import { JewelsModule } from "./jewels.module";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';





describe('Módulo de Joias', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JewelsModule],
    })
      .overrideProvider(jewelsRepositoryMock.provide)
      .useValue(jewelsRepositoryMock.useValue)
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
    it('criar uma joia', async () => {
      jest.spyOn(jewelsRepositoryMock.useValue, 'findOne').mockResolvedValue(null);
      const response = await request(app.getHttpServer())
      .post('/jewels/create')
      .send(createJewelsMock);

      expect(response.statusCode).toEqual(201);
      expect(response.body['active']).toEqual(true);
    });

    it('distribuir joias', async () => {
      userRepositoryMock.useValue.findOne.mockResolvedValueOnce(usersMock[0]);

      jewelsRepositoryMock.useValue.findOne.mockResolvedValueOnce(jewelsMock[1]);

      const response = await request(app.getHttpServer()).post(`/jewels/assign/${usersMock[0].id}/jewels/${jewelsMock[1].id}`);

      console.log('Erro', response.error);
      console.log('Código de Status', response.statusCode);

      expect(response.statusCode).toEqual(201);
      expect(response.body).toHaveProperty('active');
    });
  });

  describe('Ler', () => {
    it('encontrar todas as joias', async () => {
      const response = await request(app.getHttpServer()).get('/jewels');

      expect(response.statusCode).toEqual(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('encontrar uma joia pelo ID', async () => {
      jewelsRepositoryMock.useValue.findOne.mockResolvedValue(jewelsMock[1]);

      const response = await request(app.getHttpServer()).get(`/jewels/${jewelsMock[1].id}`);

      expect(response.statusCode).toEqual(200);
    });
  });

  describe('Atualizar', () => {
    it('atualizar uma joia', async () => {
      const response = await request(app.getHttpServer()).patch(`/jewels/${jewelsMock[4].id}`).send(updateJewelsMock);

      console.log('Erro', response.error);
      console.log('Código de Status', response.statusCode);

      expect(response.statusCode).toEqual(200);
      expect(response.body['active']).toEqual(updateJewelsMock.active);
    });
  });
});
