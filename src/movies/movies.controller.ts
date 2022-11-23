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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('movies')
@ApiTags('movies')
@ApiHeader({
  name: 'Authorization',
  allowEmptyValue: false,
  required: true,
  description: 'Bearer...',
})
@UseGuards(JwtAuthGuard)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({ summary: 'Adicionar um novo filme' })
  @ApiResponse({ status: 201, description: 'Criado com sucesso.' })
  @ApiResponse({ status: 406, description: 'Dados inválidos ou repetidos.' })
  async create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto).catch(() => {
      throw new HttpException(
        'Informações incorretas ou filme já existe.',
        HttpStatus.NOT_ACCEPTABLE,
      );
    });
  }

  @Get()
  @ApiOperation({ summary: 'Selecionar todos os filmes' })
  @ApiResponse({ status: 201, description: 'Retornados com sucesso.' })
  @ApiResponse({
    status: 404,
    description: 'Não foi possível retornar os resultados.',
  })
  async findAll() {
    return this.moviesService.findAll().catch(() => {
      throw new HttpException(
        'Não foi possível recuperar os filmes.',
        HttpStatus.NOT_FOUND,
      );
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Selecionar um filme' })
  @ApiResponse({ status: 201, description: 'Retornado com sucesso.' })
  @ApiResponse({
    status: 404,
    description: 'Dados inválidos ou não foi possível encontrar o resultado.',
  })
  async findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id).catch(() => {
      throw new HttpException(
        'Não foi possível recuperar o filme.',
        HttpStatus.NOT_FOUND,
      );
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um filme' })
  @ApiResponse({ status: 201, description: 'Editado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou não foi possível atualizar.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.update(id, updateMovieDto).catch(() => {
      throw new HttpException(
        'Não foi possível atualizar o filme.',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @Put('actor/:movieID/:actorID')
  @ApiOperation({ summary: 'Adicionar um ator a um filme' })
  @ApiResponse({ status: 201, description: 'Atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Dados inválidos ou repetidos.' })
  async addActor(
    @Param('movieID') movieID: string,
    @Param('actorID') actorID: string,
    @Body() role: { role: string },
  ) {
    return this.moviesService
      .addActor(movieID, actorID, role.role)
      .catch(() => {
        throw new HttpException(
          'Não foi possível adicionar novo actor ao filme.',
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @Put('director/:movieID/:directorID')
  @ApiOperation({ summary: 'Adicionar um diretor a um filme' })
  @ApiResponse({ status: 201, description: 'Atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Dados inválidos ou repetidos.' })
  async addDirector(
    @Param('movieID') movieID: string,
    @Param('directorID') directorID: string,
  ) {
    return this.moviesService.addDirector(movieID, directorID).catch(() => {
      throw new HttpException(
        'Não foi possível adicionar novo diretor ao filme.',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @Put('genre/:movieID/:genreID')
  @ApiOperation({ summary: 'Adicionar um genêro a um filme' })
  @ApiResponse({ status: 201, description: 'Atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Dados inválidos ou repetidos.' })
  async addGenre(
    @Param('movieID') movieID: string,
    @Param('genreID') genreID: string,
  ) {
    return this.moviesService.addGenre(movieID, genreID).catch(() => {
      throw new HttpException(
        'Não foi possível adicionar novo genêro ao filme.',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @Delete('actor/:id')
  @ApiOperation({ summary: 'Remover o ator do filme' })
  @ApiResponse({ status: 201, description: 'Removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Dados inválidos.' })
  async removeActor(@Param('id') id: string) {
    return this.moviesService.removeActor(id).catch(() => {
      throw new HttpException(
        'Não foi possível remover o ator do filme.',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @Delete('director/:id')
  @ApiOperation({ summary: 'Remover o diretor do filme' })
  @ApiResponse({ status: 201, description: 'Removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Dados inválidos.' })
  async removeDirector(@Param('id') id: string) {
    return this.moviesService.removeDirector(id).catch(() => {
      throw new HttpException(
        'Não foi possível remover o diretor do filme.',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @Delete('genre/:id')
  @ApiOperation({ summary: 'Remover o genêro do filme' })
  @ApiResponse({ status: 201, description: 'Removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Dados inválidos.' })
  async removeGenre(@Param('id') id: string) {
    return this.moviesService.removeGenre(id).catch(() => {
      throw new HttpException(
        'Não foi possível remover o genêro do filme.',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um filme' })
  @ApiResponse({ status: 201, description: 'Deletado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou não foi possível excluir.',
  })
  async remove(@Param('id') id: string) {
    return this.moviesService.remove(id).catch((e) => {
      console.log(e);
      throw new HttpException(
        'Não foi possível remover o filme.',
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
