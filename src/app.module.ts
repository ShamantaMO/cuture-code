import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EntitiesModule } from './entities/entities.module';
import { EnumModule } from './enum/enum.module';

@Module({
  imports: [UsersModule, EntitiesModule, EnumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
