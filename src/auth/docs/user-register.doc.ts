import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "src/enum/role.enum";

export class UserRegisterDoc {
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
    })
    lastName: string;
  
    @ApiProperty({
      description: 'Email do usuario',
      type: String,
      example: 'usuario@teste.com',
      title: 'Email',
    })
    email: string;
  
    @ApiProperty({
      description: 'Senha',
      type: String,
      example: 'P@$$w0rd',
      title: 'Password',
    })
    password: string;
  
    @ApiProperty({
      description: 'A função do usuário',
      enum: RoleEnum,
      example: RoleEnum.user,
      title: 'Role',
      required: false,
    })
    role: RoleEnum;
  }
  