import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jewels, Product, User } from 'src/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Jewels, Product, User])],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
