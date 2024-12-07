import { ApiProperty } from '@nestjs/swagger';
import { CategoryEnum } from 'src/enum/category.enum';

export class ResponseProductDoc {
  @ApiProperty({
    description: 'Identificação do produto',
    type: Number,
    example: 7,
    name: 'Id',
  })
  id: number;

  @ApiProperty({
    description: 'Nome do produto',
    type: String,
    example: 'Planejador de Produtividade',
    name: 'Name',
  })
  name: string;

  @ApiProperty({
    description: 'Preço do produto',
    type: Number,
    example: 24,
    name: 'Price',
  })
  price: number;

  @ApiProperty({
    description: 'Categoria do produto',
    enum: CategoryEnum,
    example: CategoryEnum.tech,
    name: 'Category',
  })
  category: CategoryEnum;

  @ApiProperty({
    description: 'Se o produto está em estoque',
    type: Boolean,
    example: true,
    name: 'In Stock',
  })
  inStock: boolean;

  @ApiProperty({
    description: 'Data de criação do produto',
    type: Date,
    example: new Date(),
    name: 'Created At',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do produto',
    type: Date,
    example: new Date(),
    name: 'Updated At',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Data de exclusão do produto',
    type: Date,
    example: null,
    name: 'Deleted At',
  })
  deletedAt: Date;
}
