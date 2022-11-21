import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
  ) {}

  create(createMovieDto: CreateMovieDto) {
    return this.moviesRepository.save(
      this.moviesRepository.create(createMovieDto),
    );
  }

  findAll() {
    return this.moviesRepository.find();
  }

  findOne(id: string) {
    return this.moviesRepository.findOneBy({ id });
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const userToUpdate = await this.moviesRepository.findOneBy({ id });

    return this.moviesRepository.save({
      ...userToUpdate,
      ...updateMovieDto,
    });
  }

  async remove(id: string) {
    const userToRemove = await this.moviesRepository.findOneBy({ id });

    return this.moviesRepository.remove(userToRemove);
  }
}
