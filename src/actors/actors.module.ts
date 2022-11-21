import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActorsService } from './actors.service';
import { ActorsController } from './actors.controller';
import { Actor } from './entities/actor.entity';

@Module({
  controllers: [ActorsController],
  imports: [TypeOrmModule.forFeature([Actor])],
  providers: [ActorsService],
})
export class ActorsModule {}
