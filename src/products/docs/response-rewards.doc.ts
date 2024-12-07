import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/entities';


export class ResponseRewardDoc {
  @ApiProperty({
    description: 'Informação sobre o sucesso da compra',
    type: String,
    example: 'Produto comprado com sucesso',
    name: 'Mensagem',
  })
  message: string;

  @ApiProperty({
    description: 'Informações sobre o comprador e a compra',
    type: User,
    example: {
      id: 5,
      firstName: 'Maria Clara',
      role: 'user',
      coins: 200,
      productsPurchased: {
        id: 12,
        name: 'Caderno de Planejamento',
        price: 30,
        category: 'Technology',
        inStock: true,
        createdAt: '2024-11-13T22:25:43.639Z',
        updatedAt: '2024-11-14T11:48:08.634Z',
        deleteAt: null,
      },
    },
    name: 'Usuário',
  })
  user: User;
}
