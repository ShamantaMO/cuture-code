import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ProductsModule } from "./products/products.module";
import { JewelsModule } from "./jewels/jewels.module";

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), 
    DatabaseModule, UsersModule, AuthModule, ProductsModule, JewelsModule,
  ],
})
export class AppModule {}