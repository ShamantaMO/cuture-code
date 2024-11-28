import { ApiProperty } from "@nestjs/swagger"
import { ResponseUserDoc } from "./response-users.doc"

export class UserRelationsDoc extends ResponseUserDoc{

    @ApiProperty({description: 'list of purchased products', type: ResponseCreateProductDoc})
    productsPurchased: ResponseCreateProductDoc[]

    @ApiProperty({type: ResponseCreateJewelsDoc})
    jewels: ResponseCreateJewelsDoc[]
}