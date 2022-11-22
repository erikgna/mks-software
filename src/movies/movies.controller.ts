import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';

@Controller('movies')
@UseGuards(JwtAuthGuard)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Put('actor/:movieID/:actorID')
  addActor(
    @Param('movieID') movieID: string,
    @Param('actorID') actorID: string,
    @Body() role: { role: string },
  ) {
    return this.moviesService.addActor(movieID, actorID, role.role);
  }

  @Put('director/:movieID/:directorID')
  addDirector(
    @Param('movieID') movieID: string,
    @Param('directorID') directorID: string,
  ) {
    return this.moviesService.addDirector(movieID, directorID);
  }

  @Put('genre/:movieID/:genreID')
  addGenre(
    @Param('movieID') movieID: string,
    @Param('genreID') genreID: string,
  ) {
    return this.moviesService.addGenre(movieID, genreID);
  }

  @Delete('actor/:movieID/:actorID')
  removeActor(
    @Param('movieID') movieID: string,
    @Param('actorID') actorID: string,
  ) {
    return this.moviesService.removeActor(movieID, actorID);
  }

  @Delete('director/:movieID/:directorID')
  removeDirector(
    @Param('movieID') movieID: string,
    @Param('directorID') directorID: string,
  ) {
    return this.moviesService.removeDirector(movieID, directorID);
  }

  @Delete('genre/:movieID/:genreID')
  removeGenre(
    @Param('movieID') movieID: string,
    @Param('genreID') genreID: string,
  ) {
    return this.moviesService.removeGenre(movieID, genreID);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
