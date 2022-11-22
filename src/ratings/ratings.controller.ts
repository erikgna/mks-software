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
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';

@Controller('ratings')
@UseGuards(JwtAuthGuard)
export class RatingsController {
  constructor(private readonly reviewersService: RatingsService) {}

  @Post()
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.reviewersService.create(createRatingDto);
  }

  @Get()
  findAll() {
    return this.reviewersService.findAll();
  }

  @Get('movie/:id')
  findAllByMovie(@Param('id') id: string) {
    return this.reviewersService.findAllByMovie(id);
  }

  @Get('reviewer/:id')
  findAllByReviewer(@Param('id') id: string) {
    return this.reviewersService.findAllByReviewer(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.reviewersService.update(id, updateRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewersService.remove(id);
  }
}
