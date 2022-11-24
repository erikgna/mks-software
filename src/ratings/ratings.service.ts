import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingsRepository: Repository<Rating>,
  ) {}

  async create(createRatingDto: CreateRatingDto) {
    const checkRating = await this.ratingsRepository.find({
      where: {
        movie: { id: createRatingDto.movie },
        reviewer: { id: createRatingDto.reviewer },
      },
    });
    if (checkRating.length > 0) {
      throw Error('Você já fez uma avaliação neste filme.');
    }

    return this.ratingsRepository.save(
      this.ratingsRepository.create({
        reviewer: { id: createRatingDto.reviewer },
        movie: { id: createRatingDto.movie },
        stars: createRatingDto.stars,
      }),
    );
  }

  findAll() {
    return this.ratingsRepository.find();
  }

  findAllByMovie(id: string) {
    return this.ratingsRepository.find({ where: { movie: { id } } });
  }

  findAllByReviewer(id: string) {
    return this.ratingsRepository.find({ where: { reviewer: { id } } });
  }

  findOne(id: string) {
    return this.ratingsRepository.findOneByOrFail({ id });
  }

  async update(id: string, updateRatingDto: UpdateRatingDto) {
    const ratingToUpdate = await this.ratingsRepository.findOneByOrFail({ id });

    return this.ratingsRepository.save({
      ...ratingToUpdate,
      stars: updateRatingDto.stars,
    });
  }

  async remove(id: string) {
    const ratingToRemove = await this.ratingsRepository.findOneByOrFail({ id });

    return this.ratingsRepository.remove(ratingToRemove);
  }
}
