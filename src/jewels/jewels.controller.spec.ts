import { Test, TestingModule } from '@nestjs/testing';
import { JewelsController } from './jewels.controller';

describe('JewelsController', () => {
  let controller: JewelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JewelsController],
    }).compile();

    controller = module.get<JewelsController>(JewelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
