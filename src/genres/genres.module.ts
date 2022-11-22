import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { Genre } from './entities/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  exports: [TypeOrmModule, GenresService],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
