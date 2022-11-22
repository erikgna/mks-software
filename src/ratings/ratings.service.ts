import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoviesService } from 'src/movies/movies.service';
import { ReviewersService } from 'src/reviewers/reviewers.service';
import { Repository } from 'typeorm';

import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingsRepository: Repository<Rating>,

    private readonly reviewersService: ReviewersService,
    private readonly moviesService: MoviesService,
  ) {}

  async create(createRatingDto: CreateRatingDto) {
    const movie = await this.moviesService.findOne(createRatingDto.movie);
    const reviewer = await this.reviewersService.findOne(
      createRatingDto.reviewer,
    );

    return this.ratingsRepository.save(
      this.ratingsRepository.create({
        reviewer,
        movie,
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
    return this.ratingsRepository.findOneBy({ id });
  }

  async update(id: string, updateRatingDto: UpdateRatingDto) {
    const ratingToUpdate = await this.ratingsRepository.findOneBy({ id });

    return this.ratingsRepository.save({
      ...ratingToUpdate,
      stars: updateRatingDto.stars,
    });
  }

  async remove(id: string) {
    const ratingToRemove = await this.ratingsRepository.findOneBy({ id });

    return this.ratingsRepository.remove(ratingToRemove);
  }
}
