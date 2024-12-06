import { ApiProperty } from "@nestjs/swagger";

export class LoginDoc{
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
}