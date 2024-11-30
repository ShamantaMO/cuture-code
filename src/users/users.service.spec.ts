import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { userRepositoryMock } from "src/testing/user-repository.mock";
import { updateUserMock } from "src/testing/user/update-user.mock";
import { userDecoratorMock } from "src/testing/user/user-decorator.mock";

describe('UserService', () => {
  let userService: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, userRepositoryMock],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('Read', () => {
    it('encontrar usuário pelo e-mail', async () => {
      const result = await userService.findByEmail(
        'shamanta.oliveira@test.com.br',
      );

      expect(result).toHaveProperty('id');
      expect(result.deleteAt).toBeNull();
    });

    it('encontrar todos os usuários', async () => {
      const users = await userService.findAll();

      expect(users.length).toBeGreaterThan(0);
    });

    it('encontrar usuário pelo ID', async () => {
      const user = await userService.userById(3);

      expect(user).toHaveProperty('email');
    });

    it('ver perfil', async () => {
      const user = await userService.userById(3);

      expect(user).toHaveProperty('coins');
      expect(user.deleteAt).toBeNull();
    });
  });

  describe('Update', () => {
      it('Deveria ser possível atualizar o usuário', async () => {
        const user = await userService.update(
          3,
          updateUserMock,
          userDecoratorMock,
        );
  
        expect(user.email).toEqual(updateUserMock.email);
        expect(user.deleteAt).toBeNull();
      });  
  });

  describe('Delete', () => {
    it('excluir usuário', async () => {
      const user = await userService.delete(4, userDecoratorMock);

      expect(user).toHaveProperty('message');
    });
  });
});