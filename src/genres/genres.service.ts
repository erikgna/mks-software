import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genresRepository: Repository<Genre>,
  ) {}

  create(createGenreDto: CreateGenreDto) {
    return this.genresRepository.save(
      this.genresRepository.create(createGenreDto),
    );
  }

  findAll() {
    return this.genresRepository.find();
  }

  findOne(id: string) {
    return this.genresRepository.findOneByOrFail({ id });
  }

  async update(id: string, updateGenreDto: UpdateGenreDto) {
    const genreToUpdate = await this.genresRepository.findOneByOrFail({ id });

    return this.genresRepository.save({
      ...genreToUpdate,
      ...updateGenreDto,
    });
  }

  async remove(id: string) {
    const genreToRemove = await this.genresRepository.findOneByOrFail({ id });

    return this.genresRepository.remove(genreToRemove);
  }
}
