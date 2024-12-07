import { ApiProperty } from "@nestjs/swagger";

export class LoginDoc{
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
}