import { ProductsService } from "../../products/products.service";
import { responseCreateProductMock } from "./resp-create-product-mock";
import { productsMock } from "./products-mock";
import { updateProductMock } from "./update-product.mock";

export const productServiceMock = {
    provide: ProductsService,
    useValue: {
        create: jest.fn().mockResolvedValue(responseCreateProductMock),
        reward: jest.fn().mockResolvedValue({message: 'Produto comprado com sucesso'}),
        productById: jest.fn().mockResolvedValue(productsMock[2]),
        update: jest.fn().mockResolvedValue({...productsMock[1], ...updateProductMock}),
        delete: jest.fn().mockResolvedValue({message: 'Produto excluído com sucesso'}),
    }
}