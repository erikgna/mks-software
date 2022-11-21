import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { Actor } from './entities/actor.entity';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorsRepository: Repository<Actor>,
  ) {}

  create(createMovieDto: CreateActorDto) {
    return this.actorsRepository.save(
      this.actorsRepository.create(createMovieDto),
    );
  }

  findAll() {
    return this.actorsRepository.find();
  }

  findOne(id: string) {
    return this.actorsRepository.findOneBy({ id });
  }

  async update(id: string, updateMovieDto: UpdateActorDto) {
    const actorToUpdate = await this.actorsRepository.findOneBy({ id });

    return this.actorsRepository.save({
      ...actorToUpdate,
      ...updateMovieDto,
    });
  }

  async remove(id: string) {
    const actorToRemove = await this.actorsRepository.findOneBy({ id });

    return this.actorsRepository.remove(actorToRemove);
  }
}
