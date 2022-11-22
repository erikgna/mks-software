import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReviewersService } from './reviewers.service';
import { ReviewersController } from './reviewers.controller';
import { Reviewer } from './entities/reviewer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reviewer])],
  exports: [TypeOrmModule, ReviewersService],
  controllers: [ReviewersController],
  providers: [ReviewersService],
})
export class ReviewersModule {}
