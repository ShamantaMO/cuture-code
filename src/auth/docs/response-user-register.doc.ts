import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "../../enum/role.enum";

export class UserDoc {
    @ApiProperty({
      description: 'Identificação do usuário',
      type: Number,
      example: 13,
      name: 'Id',
    })
    id: number;
  
    @ApiProperty({
      description: 'Primeiro nome',
      type: String,
      example: 'Shamanta',
      title: 'First Name',
    })
    firstName: string;
  
    @ApiProperty({
      description: 'Sobrenome',
      type: String,
      example: 'Oliveira',
      title: 'Last Name',
      required: false,
    })
    lastName: string;
  
    @ApiProperty({
      description: 'Email do usuario',
      type: String,
      example: 'shammy@gmail.com',
      title: 'Email',
    })
    email: string;
  
    @ApiProperty({
      description: 'Senha do usuario',
      type: String,
      example: '1234',
      title: 'Password',
    })
    password: string;
  
    @ApiProperty({
      description: 'Função do usuário',
      enum: RoleEnum,
      example: RoleEnum.user,
      title: 'Role',
      required: false,
    })
    role: RoleEnum;
  
    @ApiProperty({
      description: 'Se o e-mail do usuário está verificado',
      type: Boolean,
      example: true,
      name: 'Email Verified',
    })
    emailVerified: boolean;
  
    @ApiProperty({
      description: 'Moedas que o usuário possui',
      type: Number,
      example: 10,
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
      example: '2024-01-15T12:00:00.000Z',
      name: 'Updated At',
    })
    updatedAt: Date;
  
    @ApiProperty({
      description: 'Data de exclusão do usuário, se excluído',
      type: Date,
      example: null,
      name: 'Deleted At',
    })
    deletedAt: Date;
  }
  