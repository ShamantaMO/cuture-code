import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "src/enum/role.enum";


export class ResponseUserDoc {
  @ApiProperty({
    description: 'Identificação do usuário',
    type: Number,
    example: 5,
    name: 'Id',
  })
  id: number;

  @ApiProperty({
    description: 'Primeiro nome do usuário',
    type: String,
    example: 'Maria Clara',
    name: 'First Name',
  })
  firstName: string;

  @ApiProperty({
    description: 'Último nome do usuário',
    type: String,
    example: 'Silva Pereira',
    name: 'Last Name',
  })
  lastName: string;

  @ApiProperty({
    description: 'Email do usuário',
    type: String,
    example: 'mariaclara.silva@exemplo.com',
    name: 'Email',
  })
  email: string;

  @ApiProperty({
    description: 'Papel do usuário',
    enum: RoleEnum,
    example: RoleEnum.user,
    name: 'Role',
  })
  role: RoleEnum;

  @ApiProperty({
    description: 'Se o email do usuário está verificado',
    type: Boolean,
    example: true,
    name: 'Email Verified',
  })
  emailVerified: boolean;

  @ApiProperty({
    description: 'Quantidade de moedas do usuário',
    type: Number,
    example: 50,
    name: 'Coins',
  })
  coins: number;

  @ApiProperty({
    description: 'Data de criação do usuário',
    type: Date,
    example: '2024-01-01T00:00:00.000Z',
    name: 'Created At',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do usuário',
    type: Date,
    example: '2024-01-10T12:00:00.000Z',
    name: 'Updated At',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Data de exclusão do usuário',
    type: Date,
    example: null,
    name: 'Deleted At',
  })
  deletedAt: Date;
}
