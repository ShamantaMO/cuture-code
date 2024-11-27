import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "src/enum/role.enum";

export class UserRegisterDoc {
    @ApiProperty({
      description: 'Primeiro nome',
      type: String,
      example: 'Maria Clara',
      title: 'First Name',
    })
    firstName: string;
  
    @ApiProperty({
      description: 'Sobrenome',
      type: String,
      example: 'Silva Pereira',
      title: 'Last Name',
    })
    lastName: string;
  
    @ApiProperty({
      description: 'Email do usuario',
      type: String,
      example: 'mariaclara.silva@exemplo.com',
      title: 'Email',
    })
    email: string;
  
    @ApiProperty({
      description: 'Senha',
      type: String,
      example: 'senhaSegura123',
      title: 'Password',
    })
    password: string;
  
    @ApiProperty({
      description: 'The user role',
      enum: RoleEnum,
      example: RoleEnum.user,
      title: 'Role',
      required: false,
    })
    role: RoleEnum;
  }
  