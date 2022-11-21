import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReviewersService } from './reviewers.service';
import { CreateReviewerDto } from './dto/create-reviewer.dto';
import { UpdateReviewerDto } from './dto/update-reviewer.dto';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';

@Controller('reviewers')
@UseGuards(JwtAuthGuard)
export class ReviewersController {
  constructor(private readonly reviewersService: ReviewersService) {}

  @Post()
  create(@Body() createReviewerDto: CreateReviewerDto) {
    return this.reviewersService.create(createReviewerDto);
  }

  @Get()
  findAll() {
    return this.reviewersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReviewerDto: UpdateReviewerDto,
  ) {
    return this.reviewersService.update(id, updateReviewerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewersService.remove(id);
  }
}
