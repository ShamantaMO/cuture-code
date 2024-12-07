import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './jwt.config';
import { Product, User } from 'src/entities';


@Module({
  imports: [
    JwtModule.registerAsync({ ...jwtConfig, global: true }),
    TypeOrmModule.forFeature([User, Product]),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
