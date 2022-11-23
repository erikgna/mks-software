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
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('genres')
@ApiTags('genres')
@ApiHeader({
  name: 'Authorization',
  allowEmptyValue: false,
  required: true,
  description: 'Bearer...',
})
@UseGuards(JwtAuthGuard)
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  @ApiOperation({ summary: 'Adicionar um novo genêro' })
  @ApiResponse({ status: 201, description: 'Criado com sucesso.' })
  @ApiResponse({ status: 406, description: 'Dados inválidos ou repetidos.' })
  async create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto).catch(() => {
      throw new HttpException(
        'Informações incorretas ou repetidas.',
        HttpStatus.NOT_ACCEPTABLE,
      );
    });
  }

  @Get()
  @ApiOperation({ summary: 'Selecionar todos os genêroes' })
  @ApiResponse({ status: 201, description: 'Retornados com sucesso.' })
  @ApiResponse({
    status: 404,
    description: 'Não foi possível retornar os resultados.',
  })
  async findAll() {
    return this.genresService.findAll().catch(() => {
      throw new HttpException(
        'Não foi possível recuperar os genêros disponiveis.',
        HttpStatus.NOT_FOUND,
      );
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Selecionar um genêro' })
  @ApiResponse({ status: 201, description: 'Retornado com sucesso.' })
  @ApiResponse({
    status: 404,
    description: 'Dados inválidos ou não foi possível encontrar o resultado.',
  })
  async findOne(@Param('id') id: string) {
    return this.genresService.findOne(id).catch(() => {
      throw new HttpException(
        'Não foi possível encontrar o genêro requisitado.',
        HttpStatus.NOT_FOUND,
      );
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um genêro' })
  @ApiResponse({ status: 201, description: 'Editado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou não foi possível atualizar.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateGenreDto: UpdateGenreDto,
  ) {
    return this.genresService.update(id, updateGenreDto).catch(() => {
      throw new HttpException(
        'Não foi possível atualizar o genêro.',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um genêro' })
  @ApiResponse({ status: 201, description: 'Deletado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou não foi possível excluir.',
  })
  async remove(@Param('id') id: string) {
    return this.genresService.remove(id).catch(() => {
      throw new HttpException(
        'Não foi possível remover o genêro.',
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
