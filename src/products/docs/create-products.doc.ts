import { ApiProperty } from "@nestjs/swagger";
import { CategoryEnum } from "src/enum/category.enum";


export class CreateProductDoc {
  @ApiProperty({
    description: 'Nome do produto',
    type: String,
    example: 'Teclado Sem Fio',
    name: 'Nome',
  })
  name: string;

  @ApiProperty({
    description: 'Preço do produto',
    type: Number,
    example: 89,
    name: 'Preço',
  })
  price: number;

  @ApiProperty({
    description: 'Categoria do produto',
    enum: CategoryEnum,
    example: CategoryEnum.tech,
    name: 'Categoria',
  })
  category: CategoryEnum;

  @ApiProperty({
    description: 'Se o produto está em estoque',
    type: Boolean,
    example: true,
    name: 'Em Estoque',
  })
  inStock: boolean;
}
