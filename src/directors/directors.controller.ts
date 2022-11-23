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
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import { DirectorsService } from './directors.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';

@Controller('directors')
@ApiTags('directors')
@ApiHeader({
  name: 'Authorization',
  allowEmptyValue: false,
  required: true,
  description: 'Bearer...',
})
@UseGuards(JwtAuthGuard)
export class DirectorsController {
  constructor(private readonly directorsService: DirectorsService) {}

  @Post()
  @ApiOperation({ summary: 'Adicionar um novo diretor' })
  @ApiResponse({ status: 201, description: 'Criado com sucesso.' })
  @ApiResponse({ status: 406, description: 'Dados inválidos ou repetidos.' })
  async create(@Body() createDirectorDto: CreateDirectorDto) {
    return this.directorsService.create(createDirectorDto).catch(() => {
      throw new HttpException(
        'Informações incorretas ou repetidas.',
        HttpStatus.NOT_ACCEPTABLE,
      );
    });
  }

  @Get()
  @ApiOperation({ summary: 'Selecionar todos os diretor' })
  @ApiResponse({ status: 201, description: 'Retornados com sucesso.' })
  @ApiResponse({
    status: 404,
    description: 'Não foi possível retornar os resultados.',
  })
  async findAll() {
    return this.directorsService.findAll().catch(() => {
      throw new HttpException(
        'Não foi possível recuperar os diretores.',
        HttpStatus.NOT_FOUND,
      );
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Selecionar um diretor' })
  @ApiResponse({ status: 201, description: 'Retornado com sucesso.' })
  @ApiResponse({
    status: 404,
    description: 'Dados inválidos ou não foi possível encontrar o resultado.',
  })
  async findOne(@Param('id') id: string) {
    return this.directorsService.findOne(id).catch(() => {
      throw new HttpException(
        'Não foi possível recuperar o diretor.',
        HttpStatus.NOT_FOUND,
      );
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um diretor' })
  @ApiResponse({ status: 201, description: 'Editado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou não foi possível atualizar.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDirectorDto: UpdateDirectorDto,
  ) {
    return this.directorsService.update(id, updateDirectorDto).catch(() => {
      throw new HttpException(
        'Não foi possível atualizar o diretor.',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um diretor' })
  @ApiResponse({ status: 201, description: 'Deletado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou não foi possível excluir.',
  })
  async remove(@Param('id') id: string) {
    return this.directorsService.remove(id).catch(() => {
      throw new HttpException(
        'Não foi possível remover o diretor.',
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
