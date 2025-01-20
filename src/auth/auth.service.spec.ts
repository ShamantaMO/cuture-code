import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User, Product } from '../entities';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleEnum } from '../enum/role.enum';
import { faker } from '@faker-js/faker';

const mockUserRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
};

const mockProductRepository = {
  find: jest.fn(),
};

const mockUsersService = {
  findByEmail: jest.fn(),
};

describe('AuthService (unitário)', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
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

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve ser definido', () => {
    expect(authService).toBeDefined();
  });

  describe('Registrar (register)', () => {
    const mockUserRegisterDto = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      role: RoleEnum.user,
      coins: faker.number.int({ min: 0, max: 10 }),
    };

    it('deve registrar um novo usuário com sucesso', async () => {
      const userId = faker.number.int({ min: 1, max: 1000 }); 
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockReturnValue({ ...mockUserRegisterDto, id: userId });
      mockUserRepository.save.mockResolvedValue({ ...mockUserRegisterDto, id: userId });
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed_password');

      const result = await authService.register(mockUserRegisterDto);

      expect(usersService.findByEmail).toHaveBeenCalledWith(mockUserRegisterDto.email);
      
      expect(userRepository.save).toHaveBeenCalled();
      expect(result.email).toEqual(mockUserRegisterDto.email);
    });

    it('deve lançar exceção se o usuário já existir', async () => {
      mockUsersService.findByEmail.mockResolvedValue({ id: 1, email: 'teste@teste.com' });
    
      await expect(authService.register(mockUserRegisterDto)).rejects.toThrow(BadRequestException);
      expect(usersService.findByEmail).toHaveBeenCalledWith(mockUserRegisterDto.email);
      expect(userRepository.create).not.toHaveBeenCalled();
      expect(userRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('Login (login)', () => {
    const mockLoginDto = {
      email: 'teste@teste.com',
      password: '123456',
    };

    it('deve retornar um token de acesso quando credenciais são válidas', async () => {
      const mockUser = {
        id: 1,
        email: 'teste@teste.com',
        password: 'hashed_password',
        role: 'user',
      };
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(authService['jwtService'], 'signAsync').mockResolvedValue('token_mockado');

      const result = await authService.login(mockLoginDto);

      // assert
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: mockLoginDto.email },
        select: { id: true, email: true, password: true, role: true },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(mockLoginDto.password, mockUser.password);
      expect(result).toEqual({ access_token: 'token_mockado' });
    });

    it('deve lançar UnauthorizedException se o usuário não existir', async () => {
      // arrange
      mockUserRepository.findOne.mockResolvedValue(null);

      // act & assert
      await expect(authService.login(mockLoginDto)).rejects.toThrow(UnauthorizedException);
    });

    it('deve lançar UnauthorizedException se o usuário não existir', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
    
      await expect(authService.login(mockLoginDto)).rejects.toThrow(UnauthorizedException);
    });
    
    it('deve lançar UnauthorizedException se a senha estiver incorreta', async () => {
      const mockUser = {
        id: 1,
        email: 'teste@teste.com',
        password: 'hashed_password',
        role: 'user',
      };
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
    
      await expect(authService.login(mockLoginDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
