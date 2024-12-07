import { ApiProperty } from '@nestjs/swagger';
import { CreateProductDoc } from './create-products.doc';

export class ResponseCreateProductDoc extends CreateProductDoc {
  @ApiProperty({
    description: 'Identificação do produto',
    type: Number,
    example: 9,
    name: 'Id',
  })
  id: number;

  @ApiProperty({
    description: 'Data de criação do produto',
    type: Date,
    example: '2024-11-15T14:30:00.000Z',
    name: 'Criate At',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do produto',
    type: Date,
    example: '2024-11-16T10:00:00.000Z',
    name: 'Update At',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Data de exclusão do produto',
    type: Date,
    example: null,
    name: 'Delete At',
  })
  deletedAt: Date;
}
