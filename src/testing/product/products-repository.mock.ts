import { getRepositoryToken } from "@nestjs/typeorm";
import { Product } from "../../entities";
import { productsMock } from "./products-mock";
import { updateProductMock } from "./update-product.mock";

const mockedProduct = productsMock[3];
export const productsRepositoryMock = {
  provide: getRepositoryToken(Product),
  useValue: {
    create: jest.fn().mockImplementation((data) => ({ id: mockedProduct.id, ...data })),
    save: jest.fn().mockImplementation((data) => Promise.resolve({ id: mockedProduct.id, ...data })),
    findOne: jest.fn().mockResolvedValue(productsMock[3]),
    update: jest.fn().mockResolvedValue(updateProductMock),
    softDelete: jest.fn().mockResolvedValue({ affected: 1 }),
  },
};
