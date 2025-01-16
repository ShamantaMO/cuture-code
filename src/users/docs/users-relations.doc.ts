import { ApiProperty } from "@nestjs/swagger"
import { ResponseUserDoc } from "./response-users.doc"
import { ResponseCreateJewelsDoc } from "../../jewels/docs/resp-create-jewels.doc"
import { ResponseCreateProductDoc } from "../../products/docs/response-create-products.doc"

export class UserRelationsDoc extends ResponseUserDoc{

    @ApiProperty({description: 'lista de produtos comprados', type: ResponseCreateProductDoc})
    productsPurchased: ResponseCreateProductDoc[]

    @ApiProperty({type: ResponseCreateJewelsDoc})
    jewels: ResponseCreateJewelsDoc[]
}