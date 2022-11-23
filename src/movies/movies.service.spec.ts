import { Test, TestingModule } from '@nestjs/testing';
import { Movie } from './entities/movie.entity';

import { MoviesService } from './movies.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MovieDirection } from './entities/direction.entity';
import { MovieCast } from './entities/cast.entity';
import { MovieGenre } from './entities/genre.entity';
import { ActorsService } from '../actors/actors.service';
import { DirectorsService } from '../directors/directors.service';
import { GenresService } from '../genres/genres.service';
import { IORedisKey } from '../microservices/redis/redis.module';

describe('MoviesService', () => {
  let moviesRepository: Repository<Movie>;
  let moviesService: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesService],
      providers: [
        {
          provide: getRepositoryToken(Movie),
          useValue: {},
        },
        {
          provide: getRepositoryToken(MovieDirection),
          useValue: {},
        },
        {
          provide: getRepositoryToken(MovieCast),
          useValue: {},
        },
        {
          provide: getRepositoryToken(MovieGenre),
          useValue: {},
        },
        {
          provide: ActorsService,
          useValue: [],
        },
        {
          provide: DirectorsService,
          useValue: [],
        },
        {
          provide: GenresService,
          useValue: [],
        },
        {
          provide: IORedisKey,
          useValue: [],
        },
      ],
    }).compile();

    moviesService = module.get<MoviesService>(MoviesService);
    moviesRepository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(moviesRepository).toBeDefined();
    expect(moviesService).toBeDefined();
  });
});
