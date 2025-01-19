import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { UsersModule } from "./users.module";
import { AuthGuard } from "../guards/auth.guard";
import { authGuardMock } from "../testing/auth/auth-guard.mock";
import * as request from 'supertest';
import { usersMock } from "../testing/users.mock";
import { updateUserMock } from "../testing/user/update-user.mock";
import { userRepositoryMock } from "../testing/user/user-repository.mock";

describe('Users Module 2e2', () => {
    let app: INestApplication;
  
    beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [UsersModule],
      })
        .overrideProvider(userRepositoryMock.provide)
        .useValue(userRepositoryMock.useValue)
        .overrideGuard(AuthGuard)
        .useValue(authGuardMock)
        .compile();
    
      app = module.createNestApplication();
      app.useGlobalPipes(new ValidationPipe());
    
      await app.init(); 
    });
  
    afterAll(async () => {
      app.close();
    });
  
    it('Deve estar definido.', () => {
      expect(app).toBeDefined();
    });
  
    describe('Read', () => {
      it('ver o perfil do usuário', async () => {
        const response = await request(app.getHttpServer())
          .get('/users/perfil');

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('email');
      });
  
      it('should be find all users', async () => {
  
        const response = await request(app.getHttpServer())
          .get('/users')
          
        console.log('Error:', response.error);
        console.log('StatusCode:', response.statusCode);
  
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual([usersMock]);
      });
  
      it('should be find user by id', async () => {
        const response = await request(app.getHttpServer()).get(`/users/${usersMock[1].id}`)
  
        expect(response.statusCode).toEqual(200)
        expect(response.body).toHaveProperty('email')
      })
    });

    describe('Update', () => {
      it('should be update an user', async() => {
        const response = await request(app.getHttpServer())
        .patch(`/users/${usersMock[4].id}`).send(updateUserMock)
  
        console.log('Error:', response.error);
        console.log('StatusCode:', response.statusCode);
  
        expect(response.statusCode).toEqual(200)
        expect(response.body).toHaveProperty('email', updateUserMock.email)
      })
    })
  
    describe('Delete', () => {
      it('should be delete an user', async() => {
        const response = await request(app.getHttpServer()).delete(`/users/${usersMock[3].id}`)
  
        expect(response.statusCode).toEqual(200)
        expect(response.body).toHaveProperty('message')
      })
    })
  });