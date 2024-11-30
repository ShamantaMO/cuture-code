import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Documentação da API Culture Code')
  .setDescription(
    `Este sistema de gamificação foi desenvolvido para engajar e recompensar os usuários de uma empresa através de um mecanismo de compra e gestão de produtos e joias.`,
  )
  
  .addTag('CultureCode') 
  .build();