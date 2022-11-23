import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie } from './entities/movie.entity';
import { MovieDirection } from './entities/direction.entity';
import { MovieGenre } from './entities/genre.entity';
import { MovieCast } from './entities/cast.entity';
import { ActorsModule } from '../actors/actors.module';
import { DirectorsModule } from '../directors/directors.module';
import { GenresModule } from '../genres/genres.module';
import { redisModule } from '../microservices/redis/module.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    TypeOrmModule.forFeature([MovieDirection]),
    TypeOrmModule.forFeature([MovieGenre]),
    TypeOrmModule.forFeature([MovieCast]),
    ActorsModule,
    DirectorsModule,
    GenresModule,
    redisModule,
  ],
  exports: [TypeOrmModule, MoviesService],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
