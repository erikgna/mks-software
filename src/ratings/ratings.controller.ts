import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('ratings')
@ApiTags('ratings')
@ApiHeader({
  name: 'Authorization',
  allowEmptyValue: false,
  required: true,
  description: 'Bearer...',
})
@UseGuards(JwtAuthGuard)
export class RatingsController {
  constructor(private readonly reviewersService: RatingsService) {}

  @Post()
  @ApiOperation({ summary: 'Adicionar uma nova avaliação' })
  @ApiResponse({ status: 201, description: 'Criado com sucesso.' })
  @ApiResponse({ status: 406, description: 'Dados inválidos ou repetidos.' })
  async create(@Body() createRatingDto: CreateRatingDto) {
    return this.reviewersService.create(createRatingDto).catch(() => {
      throw new HttpException(
        'Informações incorretas ou repetidas.',
        HttpStatus.NOT_ACCEPTABLE,
      );
    });
  }

  @Get()
  @ApiOperation({ summary: 'Selecionar todas as avaliações' })
  @ApiResponse({ status: 201, description: 'Retornados com sucesso.' })
  @ApiResponse({
    status: 404,
    description: 'Não foi possível retornar os resultados.',
  })
  async findAll() {
    return this.reviewersService.findAll().catch(() => {
      throw new HttpException(
        'Não foi possível recuperar as avaliaçãoes.',
        HttpStatus.NOT_FOUND,
      );
    });
  }

  @Get('movie/:id')
  @ApiOperation({ summary: 'Pegar avaliações relacionados com filme' })
  @ApiResponse({ status: 201, description: 'Retornado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Dados inválidos.' })
  async findAllByMovie(@Param('id') id: string) {
    return this.reviewersService.findAllByMovie(id).catch(() => {
      throw new HttpException(
        'Não foi possível recuperar as avaliaçãoes.',
        HttpStatus.NOT_FOUND,
      );
    });
  }

  @Get('reviewer/:id')
  @ApiOperation({ summary: 'Pegar avaliações relacionados com um analista' })
  @ApiResponse({ status: 201, description: 'Retornado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Dados inválidos.' })
  async findAllByReviewer(@Param('id') id: string) {
    return this.reviewersService.findAllByReviewer(id).catch(() => {
      throw new HttpException(
        'Não foi possível recuperar as avaliaçãoes.',
        HttpStatus.NOT_FOUND,
      );
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Selecionar uma avaliação' })
  @ApiResponse({ status: 201, description: 'Retornado com sucesso.' })
  @ApiResponse({
    status: 404,
    description: 'Dados inválidos ou não foi possível encontrar o resultado.',
  })
  async findOne(@Param('id') id: string) {
    return this.reviewersService.findOne(id).catch(() => {
      throw new HttpException(
        'Não foi possível recuperar a avaliação.',
        HttpStatus.NOT_FOUND,
      );
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma avaliação' })
  @ApiResponse({ status: 201, description: 'Editado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou não foi possível atualizar.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateRatingDto: UpdateRatingDto,
  ) {
    return this.reviewersService.update(id, updateRatingDto).catch(() => {
      throw new HttpException(
        'Não foi possível atualizar a avaliação.',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma avaliação' })
  @ApiResponse({ status: 201, description: 'Deletado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou não foi possível excluir.',
  })
  async remove(@Param('id') id: string) {
    return this.reviewersService.remove(id).catch(() => {
      throw new HttpException(
        'Não foi possível remover a avaliação.',
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
