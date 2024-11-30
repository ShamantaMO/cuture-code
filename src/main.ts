import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './database/datasource';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  AppDataSource.initialize()
    .then(() => {
      console.log('A fonte de dados foi inicializada!');
    })
    .catch((err) => {
      console.error('Erro durante a inicialização da fonte de dados:', err);
    });
    
}

bootstrap();
