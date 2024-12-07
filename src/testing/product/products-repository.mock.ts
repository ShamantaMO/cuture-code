import { getRepositoryToken } from '@nestjs/typeorm';
import { responseCreateProductMock } from './resp-create-product-mock';
import { productsMock } from './products-mock';
import { updateProductMock } from './update-product.mock';
import { Product } from 'src/entities/products.entity';

export const productsRepositoryMock = {
  provide: getRepositoryToken(Product),
  useValue: {
    create: jest.fn().mockResolvedValue(responseCreateProductMock),
    findOne: jest.fn().mockResolvedValue(productsMock[3]),
    save: jest.fn(),
    update: jest
      .fn()
      .mockResolvedValue({ ...productsMock[3], ...updateProductMock }),
    softDelete: jest.fn().mockResolvedValue(productsMock[2]),
  },
};
