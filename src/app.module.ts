import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EnumModule } from './enum/enum.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [UsersModule, DatabaseModule, EnumModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // Torna o ConfigModule disponível globalmente
      envFilePath: '.env', // Caminho para o arquivo de variáveis de ambiente
    }),
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
