import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { authGuardMock } from "../testing/auth/auth-guard.mock";
import { RolesGuard } from "../guards/role.guard";
import { rolesGuardMock } from "../testing/auth/roles-guard.mock";
import { userDecoratorMock } from "../testing/user/user-decorator.mock";
import { updateUserMock } from "../testing/user/update-user.mock";
import { userServiceMock } from "../testing/user/user-service.mock";
import { AuthGuard } from "../guards/auth.guard";

describe('UserController', () => {
  let userController: UsersController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [userServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .compile();

    userController = module.get<UsersController>(UsersController);
  });

  it('Deve estar definido', () => {
    expect(userController).toBeDefined();
  });

  describe('Read', () => {
    it('encontrar o perfil do usuário', async () => {
      const user = await userController.profile(userDecoratorMock);

      console.log(user);
      expect(user).toHaveProperty('id');
      expect(user.deleteAt).toBeNull();
    });

    it('encontrar todos os usuários', async () => {
      const users = await userController.findAll();

      expect(users.length).toBeGreaterThan(0);
    });

    it('encontrar usuário pelo ID', async () => {
      const user = await userController.userById(9);

      expect(user.role).toEqual('admin');
      expect(user.deleteAt).toBeNull();
    });
  });

  describe('Update', () => {
    it('atualizar usuário', async () => {
      const user = await userController.update(
        10,
        updateUserMock,
        userDecoratorMock,
      );

      expect(user.email).toEqual(updateUserMock.email);
    });
  });

  describe('Delete', () => {
    it('excluir usuário', async () => {
      const user = await userController.delete(10, userDecoratorMock);

      expect(userDecoratorMock.userRole).toEqual('admin');
      expect(user).toHaveProperty('message');
    });
  });
});