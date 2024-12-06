import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Documentação do Culture Code')
  .setDescription(
    'Sistema de gamificação'
  )
  .addTag('cultureCode')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
