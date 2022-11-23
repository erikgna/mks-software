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
import { ReviewersService } from './reviewers.service';
import { CreateReviewerDto } from './dto/create-reviewer.dto';
import { UpdateReviewerDto } from './dto/update-reviewer.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('reviewers')
@ApiTags('reviewers')
@ApiHeader({
  name: 'Authorization',
  allowEmptyValue: false,
  required: true,
  description: 'Bearer...',
})
@UseGuards(JwtAuthGuard)
export class ReviewersController {
  constructor(private readonly reviewersService: ReviewersService) {}

  @Post()
  @ApiOperation({ summary: 'Adicionar um novo analista' })
  @ApiResponse({ status: 201, description: 'Criado com sucesso.' })
  @ApiResponse({ status: 406, description: 'Dados inválidos ou repetidos.' })
  async create(@Body() createReviewerDto: CreateReviewerDto) {
    return this.reviewersService.create(createReviewerDto).catch(() => {
      throw new HttpException(
        'Informações incorretas ou repetidas.',
        HttpStatus.NOT_ACCEPTABLE,
      );
    });
  }

  @Get()
  @ApiOperation({ summary: 'Selecionar todos os analista' })
  @ApiResponse({ status: 201, description: 'Retornados com sucesso.' })
  @ApiResponse({
    status: 404,
    description: 'Não foi possível retornar os resultados.',
  })
  async findAll() {
    return this.reviewersService.findAll().catch(() => {
      throw new HttpException(
        'Não foi possível recuperar os avaliadores.',
        HttpStatus.NOT_FOUND,
      );
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Selecionar um analista' })
  @ApiResponse({ status: 201, description: 'Retornado com sucesso.' })
  @ApiResponse({
    status: 404,
    description: 'Dados inválidos ou não foi possível encontrar o resultado.',
  })
  async findOne(@Param('id') id: string) {
    return this.reviewersService.findOne(id).catch(() => {
      throw new HttpException(
        'Não foi possível recuperar o avaliador.',
        HttpStatus.NOT_FOUND,
      );
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um analista' })
  @ApiResponse({ status: 201, description: 'Editado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou não foi possível atualizar.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateReviewerDto: UpdateReviewerDto,
  ) {
    return this.reviewersService.update(id, updateReviewerDto).catch(() => {
      throw new HttpException(
        'Não foi possível atualizar o avaliador.',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um analista' })
  @ApiResponse({ status: 201, description: 'Deletado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou não foi possível excluir.',
  })
  async remove(@Param('id') id: string) {
    return this.reviewersService.remove(id).catch(() => {
      throw new HttpException(
        'Não foi possível remover o avaliador.',
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
