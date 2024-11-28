import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EnumModule } from './enum/enum.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { JewelsController } from './jewels/jewels.controller';
import { JewelsModule } from './jewels/jewels.module';
import { JewelsService } from './jewels/jewels.service';


@Module({
  imports: [UsersModule, DatabaseModule, EnumModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env', 
    }),
    ProductsModule,
    JewelsModule
  ],
  controllers: [JewelsController],
  providers: [JewelsService],

  
})
export class AppModule {}
