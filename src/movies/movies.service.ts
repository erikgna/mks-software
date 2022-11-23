import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { ActorsService } from '../actors/actors.service';
import { DirectorsService } from '../directors/directors.service';
import { GenresService } from '../genres/genres.service';
import { IORedisKey } from '../microservices/redis/redis.module';
import { Repository } from 'typeorm';

import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieCast } from './entities/cast.entity';
import { MovieDirection } from './entities/direction.entity';
import { MovieGenre } from './entities/genre.entity';
import { Movie } from './entities/movie.entity';
import { Actor } from 'src/actors/entities/actor.entity';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,

    @InjectRepository(MovieDirection)
    private readonly movieDirectionsRepository: Repository<MovieDirection>,

    @InjectRepository(MovieCast)
    private readonly movieCastsRepository: Repository<MovieCast>,

    @InjectRepository(MovieGenre)
    private readonly movieGenresRepository: Repository<MovieGenre>,

    private readonly actorsService: ActorsService,
    private readonly genresService: GenresService,
    private readonly directorsService: DirectorsService,

    @Inject(IORedisKey) private readonly redisClient: Redis,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    if (
      createMovieDto.castsID.length === 0 ||
      createMovieDto.directorsID.length === 0 ||
      createMovieDto.genresID.length === 0
    ) {
      throw Error();
    }

    const createdMovie = await this.moviesRepository.save(
      this.moviesRepository.create(createMovieDto),
    );
    try {
      for (const item of createMovieDto.castsID) {
        const cast = this.movieCastsRepository.create({
          role: item.role,
          movie: createdMovie,
          actor: { id: item.actorID },
        });

        await this.movieCastsRepository.save(cast);
      }

      for (const item of createMovieDto.directorsID) {
        const director = this.movieDirectionsRepository.create({
          movie: createdMovie,
          director: { id: item },
        });

        await this.movieDirectionsRepository.save(director);
      }

      for (const item of createMovieDto.genresID) {
        const genre = this.movieGenresRepository.create({
          movie: createdMovie,
          genre: { id: item },
        });

        await this.movieGenresRepository.save(genre);
      }
      return createdMovie;
    } catch (error) {
      this.moviesRepository.remove(createdMovie);
      throw Error();
    }
  }

  async findAll() {
    const moviesFromDB = await this.moviesRepository.find();

    const cachedMovies = (await this.redisClient.call(
      'JSON.GET',
      'all_movies',
    )) as string;

    if (cachedMovies) {
      return JSON.parse(cachedMovies);
    }

    if (moviesFromDB.length > 0) {
      this.redisClient
        .multi([
          [
            'send_command',
            'JSON.SET',
            'all_movies',
            '.',
            JSON.stringify(moviesFromDB),
          ],
          ['expire', 'all_movies', 300],
        ])
        .exec();
    }

    return moviesFromDB;
  }

  findOne(id: string) {
    return this.moviesRepository.findOneOrFail({
      where: { id },
      relations: {
        movieCast: {
          actor: true,
        },
        movieDirection: {
          director: true,
        },
        movieGenre: {
          genre: true,
        },
        ratings: true,
      },
    });
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const movieToUpdate = await this.moviesRepository.findOneByOrFail({ id });

    return this.moviesRepository.save({
      ...movieToUpdate,
      ...updateMovieDto,
    });
  }

  async addActor(movieID: string, actorID: string, role: string) {
    const checkIfExists = await this.movieCastsRepository.find({
      where: {
        movie: { id: movieID },
        actor: { id: actorID },
      },
    });
    if (checkIfExists.length > 0) {
      throw Error();
    }

    return this.movieCastsRepository.save(
      this.movieCastsRepository.create({
        role,
        movie: { id: movieID },
        actor: { id: actorID },
      }),
    );
  }

  async addDirector(movieID: string, directorID: string) {
    const checkIfExists = await this.movieDirectionsRepository.find({
      where: {
        movie: { id: movieID },
        director: { id: directorID },
      },
    });
    if (checkIfExists.length > 0) {
      throw Error();
    }

    return this.movieDirectionsRepository.save(
      this.movieDirectionsRepository.create({
        movie: { id: movieID },
        director: { id: directorID },
      }),
    );
  }

  async addGenre(movieID: string, genreID: string) {
    const checkIfExists = await this.movieGenresRepository.find({
      where: {
        movie: { id: movieID },
        genre: { id: genreID },
      },
    });
    if (checkIfExists.length > 0) {
      throw Error();
    }

    return this.movieGenresRepository.save(
      this.movieGenresRepository.create({
        movie: { id: movieID },
        genre: { id: genreID },
      }),
    );
  }

  async removeActor(id: string) {
    const actorToRemovie = await this.movieCastsRepository.findOneByOrFail({
      id,
    });

    return this.movieCastsRepository.remove(actorToRemovie);
  }

  async removeDirector(id: string) {
    const directorToRemovie =
      await this.movieDirectionsRepository.findOneByOrFail({
        id,
      });

    return this.movieDirectionsRepository.remove(directorToRemovie);
  }

  async removeGenre(id: string) {
    const genreToRemovie = await this.movieGenresRepository.findOneByOrFail({
      id,
    });

    return this.movieGenresRepository.remove(genreToRemovie);
  }

  async remove(id: string) {
    const movieToRemove = await this.moviesRepository.findOneByOrFail({ id });

    return this.moviesRepository.remove(movieToRemove);
  }
}
