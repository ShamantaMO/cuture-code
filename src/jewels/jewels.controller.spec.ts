import { Test, TestingModule } from "@nestjs/testing";
import { JewelsController } from "./jewels.controller";
import { jewelsServiceMock } from "../testing/jewels/jewels-service.mock";
import { AuthGuard } from "../guards/auth.guard";
import { authGuardMock } from "../testing/auth/auth-guard.mock";
import { createJewelsMock } from "../testing/jewels/create-jewels.mock";
import { updateJewelsMock } from "../testing/jewels/update-jewels.mock";


describe('JewelsController', () => {
  let jewelsController: JewelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JewelsController],
      providers: [jewelsServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

      jewelsController = module.get<JewelsController>(JewelsController);
  });

  it('deve estar definido', () => {
    expect(jewelsController).toBeDefined();
  });

  describe('Criar', () => {
    it('criar uma joia', async () => {
      const newJewel = await jewelsController.create(createJewelsMock);

      expect(newJewel).toHaveProperty('id');
    });

    it('distribuir joias', async () => {
      const jewels = await jewelsController.distribuiteJewels(2, 3);

      expect(jewels.active).toEqual(false);
    });
  });

  describe('Ler', () => {
    it('encontrar todas as joias', async () => {
      const jewels = await jewelsController.findAll();

      expect(jewels.length).toBeGreaterThan(0);
    });

    it('encontrar uma joia pelo ID', async () => {
      const jewelId = 9;
      const jewel = await jewelsController.jewelById(jewelId);

      console.log('usuário ', jewel.user);

      expect(jewel.name).toEqual('Groot Seed');
    });
  });

  describe('Atualizar', () => {
    it('atualizar uma joia', async () => {
      const updateJewel = await jewelsController.update(1, updateJewelsMock);

      expect(updateJewel.active).toEqual(updateJewelsMock.active);
    });
  });
});
