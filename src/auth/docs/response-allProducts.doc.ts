import { ApiProperty } from "@nestjs/swagger";
import { ResponseProductDoc } from "./response-products.doc";

export class ResponseFindAllProductsDoc {
    @ApiProperty({
      description: 'Página que está sendo exibida',
      type: Number,
      example: 1,
      name: 'Página',
    })
    page: number;
  
    @ApiProperty({
      description: 'Limite de produtos a serem exibidos',
      type: Number,
      example: 5,
      name: 'Limite',
    })
    limit: number;
  
    @ApiProperty({
      description: 'Total de produtos a serem exibidos',
      type: Number,
      example: 1,
      name: 'Total',
    })
    total: number;
  
    @ApiProperty({
      description: 'Produtos encontrados',
      type: ResponseProductDoc,
      name: 'Dados',
    })
    data: ResponseProductDoc;
  }
  