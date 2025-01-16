import { ApiProperty } from "@nestjs/swagger";
import { TransactionEnum } from "../../enum/transaction.enum";

export class CreateJewelsDoc {
  
    @ApiProperty({ 
        description: 'jewels name', 
        type: String, 
        example: 'Inclusion Stone', 
        name: 'name' })
  name: string;
 
  @ApiProperty({ 
    description: 'jewels price', 
    type: Number, 
    example: 60, 
    name: 'price' })
  price: number;
  
  @ApiProperty({ 
    description: 'jewels description',
    type: String, 
    example: 'Prêmio por promover a inclusão e diversidade no ambiente de trabalho.', 
    name: 'description' })
  description: string;
  
  @ApiProperty({ 
    description: 'jewels transaction type', 
    enum: TransactionEnum, 
    example: TransactionEnum.Gift, 
    name: 'transactionType' })
  transactionType: TransactionEnum;
  
  @ApiProperty({ 
    description: 'jewels active', 
    type: Boolean, 
    example: true, 
    name: 'active' })
  active: boolean;
}