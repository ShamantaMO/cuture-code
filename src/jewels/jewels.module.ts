import { Module } from '@nestjs/common';
import { JewelsController } from './jewels.controller';
import { JewelsService } from './jewels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jewels, User } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Jewels, User])],
  controllers: [JewelsController],
  providers: [JewelsService],
})
export class JewelsModule {}
