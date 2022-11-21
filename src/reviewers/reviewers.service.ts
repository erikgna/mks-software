import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateReviewerDto } from './dto/create-reviewer.dto';
import { UpdateReviewerDto } from './dto/update-reviewer.dto';
import { Reviewer } from './entities/reviewer.entity';

@Injectable()
export class ReviewersService {
  constructor(
    @InjectRepository(Reviewer)
    private readonly reviewersRepository: Repository<Reviewer>,
  ) {}

  create(createReviewerDto: CreateReviewerDto) {
    return this.reviewersRepository.save(
      this.reviewersRepository.create(createReviewerDto),
    );
  }

  findAll() {
    return this.reviewersRepository.find();
  }

  findOne(id: string) {
    return this.reviewersRepository.findOneBy({ id });
  }

  async update(id: string, updateReviewerDto: UpdateReviewerDto) {
    const reviewerToUpdate = await this.reviewersRepository.findOneBy({ id });

    return this.reviewersRepository.save({
      ...reviewerToUpdate,
      ...updateReviewerDto,
    });
  }

  async remove(id: string) {
    const reviewerToRemove = await this.reviewersRepository.findOneBy({ id });

    return this.reviewersRepository.remove(reviewerToRemove);
  }
}
