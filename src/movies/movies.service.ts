import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorsService } from 'src/actors/actors.service';
import { DirectorsService } from 'src/directors/directors.service';
import { GenresService } from 'src/genres/genres.service';
import { Repository } from 'typeorm';

import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieCast } from './entities/cast.entity';
import { MovieDirection } from './entities/direction.entity';
import { MovieGenre } from './entities/genre.entity';
import { Movie } from './entities/movie.entity';

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
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const createdMovie = await this.moviesRepository.save(
      this.moviesRepository.create(createMovieDto),
    );

    for (const item of createMovieDto.castsID) {
      const actor = await this.actorsService.findOne(item.actorID);

      await this.movieCastsRepository.save(
        this.movieCastsRepository.create({
          role: item.role,
          movie: createdMovie,
          actor,
        }),
      );
    }

    for (const item of createMovieDto.directorsID) {
      const director = await this.directorsService.findOne(item);

      await this.movieDirectionsRepository.save(
        this.movieDirectionsRepository.create({
          movie: createdMovie,
          director,
        }),
      );
    }

    for (const item of createMovieDto.genresID) {
      const genre = await this.genresService.findOne(item);

      await this.movieGenresRepository.save(
        this.movieGenresRepository.create({
          movie: createdMovie,
          genre,
        }),
      );
    }

    return createdMovie;
  }

  findAll() {
    return this.moviesRepository.find({
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

  findOne(id: string) {
    return this.moviesRepository.findOneBy({ id });
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const movieToUpdate = await this.moviesRepository.findOneBy({ id });

    return this.moviesRepository.save({
      ...movieToUpdate,
      ...updateMovieDto,
    });
  }

  async addActor(movieID: string, actorID: string, role: string) {
    const actor = await this.actorsService.findOne(actorID);
    const movie = await this.moviesRepository.findOneBy({ id: movieID });

    return this.movieCastsRepository.save(
      this.movieCastsRepository.create({
        role,
        movie,
        actor,
      }),
    );
  }

  async addDirector(movieID: string, directorID: string) {
    const director = await this.directorsService.findOne(directorID);
    const movie = await this.moviesRepository.findOneBy({ id: movieID });

    return this.movieDirectionsRepository.save(
      this.movieDirectionsRepository.create({
        movie,
        director,
      }),
    );
  }

  async addGenre(movieID: string, genreID: string) {
    const genre = await this.genresService.findOne(genreID);
    const movie = await this.moviesRepository.findOneBy({ id: movieID });

    return this.movieGenresRepository.save(
      this.movieGenresRepository.create({
        movie,
        genre,
      }),
    );
  }

  async removeActor(movieID: string, actorID: string) {
    const actorToRemovie = await this.movieCastsRepository.findOneBy({
      actor: { id: actorID },
      movie: { id: movieID },
    });

    return this.movieCastsRepository.remove(actorToRemovie);
  }

  async removeDirector(movieID: string, directorID: string) {
    const directorToRemovie = await this.movieDirectionsRepository.findOneBy({
      director: { id: directorID },
      movie: { id: movieID },
    });

    return this.movieDirectionsRepository.remove(directorToRemovie);
  }

  async removeGenre(movieID: string, genreID: string) {
    const genreToRemovie = await this.movieGenresRepository.findOneBy({
      genre: { id: genreID },
      movie: { id: movieID },
    });

    return this.movieGenresRepository.remove(genreToRemovie);
  }

  async remove(id: string) {
    const movieToRemove = await this.moviesRepository.findOneBy({ id });

    return this.moviesRepository.remove(movieToRemove);
  }
}
