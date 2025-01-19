// auth.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, Product } from '../entities';
import { faker } from '@faker-js/faker';
import { RoleEnum } from '../enum/role.enum';

describe('AuthController (unitário)', () => {
  let controller: AuthController;

  const mockUserRepository = {};
  const mockProductRepository = {};
  
  const mockAuthService = {
    register: jest.fn().mockImplementation((dto) => {
      return {
        id: faker.number.int({ min: 1, max: 1000 }),
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
        emailVerified: false,
      };
    }),
    login: jest.fn().mockResolvedValue({ access_token: 'mocked_token' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        UsersService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('deve ser definida', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('deve registrar um novo usuário com sucesso', async () => {
      const registerDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        role: RoleEnum.user,
        coins: faker.number.int({ min: 0, max: 1000 }),
      };

      const result = await controller.register(registerDto);

      expect(result).toHaveProperty('id');
      expect(result.email).toBe(registerDto.email);
      expect(mockAuthService.register).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('login', () => {
    it('deve fazer login com sucesso e retornar um token', async () => {
      const loginDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const result = await controller.login(loginDto);

      expect(result).toHaveProperty('access_token');
      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
    });
  });
});
