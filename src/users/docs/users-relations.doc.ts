import { ApiProperty } from '@nestjs/swagger';
import { ResponseUserDoc } from './response-users.doc';
import { ResponseCreateJewelsDoc } from 'src/jewels/docs/resp-create-jewels.doc';
import { ResponseCreateProductDoc } from 'src/products/docs/response-create-products.doc';

export class UserRelationsDoc extends ResponseUserDoc {
  @ApiProperty({
    description: 'lista de produtos comprados',
    type: ResponseCreateProductDoc,
  })
  productsPurchased: ResponseCreateProductDoc[];

  @ApiProperty({ type: ResponseCreateJewelsDoc })
  jewels: ResponseCreateJewelsDoc[];
}
