import { ApiProperty } from "@nestjs/swagger";
import { CategoryEnum } from "src/enum/category.enum";


export class CreateProductDoc {
  @ApiProperty({
    description: 'Nome do produto',
    type: String,
    example: 'Teclado Sem Fio',
    name: 'name',
  })
  name: string;

  @ApiProperty({
    description: 'Preço do produto',
    type: Number,
    example: 89,
    name: 'price',
  })
  price: number;

  @ApiProperty({
    description: 'Categoria do produto',
    enum: CategoryEnum,
    example: CategoryEnum.tech,
    name: 'category',
  })
  category: CategoryEnum;

  @ApiProperty({
    description: 'Se o produto está em estoque',
    type: Boolean,
    example: true,
    name: 'inStock',
  })
  inStock: boolean;
}
