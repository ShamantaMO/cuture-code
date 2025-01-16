import { Test, TestingModule } from "@nestjs/testing";
import { JewelsService } from "./jewels.service";
import { jewelsRepositoryMock } from "../testing/jewels/jewels-repository.mock";
import { userRepositoryMock } from "../testing/user/user-repository.mock";
import { createJewelsMock } from "../testing/jewels/create-jewels.mock";
import { jewelsMock } from "../testing/jewels/jewels.mock";
import { updateJewelsMock } from "../testing/jewels/update-jewels.mock";

describe('JewelsService', () => {
  let jewelsService: JewelsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JewelsService, jewelsRepositoryMock, userRepositoryMock],
    }).compile();

    jewelsService = module.get<JewelsService>(JewelsService);
  });

  it('deve estar definido', () => {
    expect(jewelsService).toBeDefined();
  });

  describe('Criar', () => {
    it('deve criar uma joia', async () => {
      jest.spyOn(jewelsService, 'findJewel').mockResolvedValueOnce(null);
      const jewel = await jewelsService.create(createJewelsMock);

      expect(jewel).toHaveProperty('id');
    });

    it('deve distribuir joias', async () => {
      const userId = 2;
      const jewelId = 2;
      const mockUser = {
        id: userId,
        firstName: 'Thiago',
        lastName: 'Coelho',
        email: 'thiago.coelho@teste.com.br',
        password: '1234',
        role: 'user',
        emailVerified: true,
        createdAt: '2024-11-12 09:40:34.562012',
        updatedAt: '2024-11-13 19:19:32.0005',
        deleteAt: null,
        coins: 10,
        productsPurchased: [],
        jewels: [],
      };

      userRepositoryMock.useValue.findOne.mockResolvedValueOnce(mockUser);

      await jewelsService.distribuiteJewels(userId, jewelId);

      expect(userRepositoryMock.useValue.findOne).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        select: {
          id: true,
          firstName: true,
          role: true,
          email: true,
          coins: true,
        },
        relations: { jewels: true },
      });

      expect(userRepositoryMock.useValue.save).toHaveBeenCalledWith({
        ...mockUser,
        coins: 210,
        jewels: [{ id: mockUser.id }],
      });

      expect(jewelsRepositoryMock.useValue.save).toHaveBeenCalledWith({
        ...jewelsMock[1],
        active: false,
        user: { id: mockUser.id },
      });
    });
  });

  describe('Ler', () => {
    it('encontrar uma joia pelo ID', async () => {
      const jewel = await jewelsService.jewelById(2);

      expect(jewel.name).toContain('Star-Lord Charm');
    });

    it('encontrar todas as joias', async () => {
      const jewels = await jewelsService.findAll();

      expect(jewels.length).toBeGreaterThan(0);
    });

    it('encontrar uma joia pelo nome', async () => {
      const jewel = await jewelsService.findJewel('Team Catalyst');

      expect(jewel).toHaveProperty('id');
    });
  });

  describe('Atualizar', () => {
    it('atualizar uma joia', async () => {
      jewelsRepositoryMock.useValue.findOne.mockResolvedValue(
        jewelsMock[3],
      );

      const jewel = await jewelsService.update(9, updateJewelsMock);
      expect(jewel.active).toEqual(updateJewelsMock.active);
    });
  });
});
