import { getRepositoryToken } from '@nestjs/typeorm';
import { usersMock } from '../users.mock';
import { updateUserMock } from './update-user.mock';
import { User } from 'src/entities';

export const userRepositoryMock = {
  provide: getRepositoryToken(User),
  useValue: {
    find: jest.fn().mockResolvedValue([usersMock]),
    findOne: jest.fn().mockResolvedValue(usersMock[1]),
    update: jest.fn().mockResolvedValue(usersMock[1]),
    softDelete: jest.fn(),
    findOneBy: jest
      .fn()
      .mockResolvedValue({ ...usersMock[1], ...updateUserMock }),
    save: jest.fn().mockResolvedValue({}),
  },
};
