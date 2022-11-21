import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { Director } from './entities/director.entity';

@Injectable()
export class DirectorsService {
  constructor(
    @InjectRepository(Director)
    private readonly directorsRepository: Repository<Director>,
  ) {}

  create(createDirectorDto: CreateDirectorDto) {
    return this.directorsRepository.save(
      this.directorsRepository.create(createDirectorDto),
    );
  }

  findAll() {
    return this.directorsRepository.find();
  }

  findOne(id: string) {
    return this.directorsRepository.findOneBy({ id });
  }

  async update(id: string, updateDirectorDto: UpdateDirectorDto) {
    const directorToUpdate = await this.directorsRepository.findOneBy({ id });

    return this.directorsRepository.save({
      ...directorToUpdate,
      ...updateDirectorDto,
    });
  }

  async remove(id: string) {
    const directorToRemove = await this.directorsRepository.findOneBy({ id });

    return this.directorsRepository.remove(directorToRemove);
  }
}
