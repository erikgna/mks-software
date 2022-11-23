import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Adicionar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Criado com sucesso.' })
  @ApiResponse({ status: 406, description: 'Dados inválidos ou repetidos.' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto).catch(() => {
      throw new HttpException(
        'Informações incorretas ou usuário já existe.',
        HttpStatus.NOT_ACCEPTABLE,
      );
    });
  }

  @Get()
  @ApiOperation({ summary: 'Selecionar todos os usuárioes' })
  @ApiResponse({ status: 201, description: 'Retornados com sucesso.' })
  @ApiResponse({
    status: 404,
    description: 'Não foi possível retornar os resultados.',
  })
  @ApiHeader({
    name: 'Authorization',
    allowEmptyValue: false,
    required: true,
    description: 'Bearer...',
  })
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.usersService.findAll().catch(() => {
      throw new HttpException(
        'Não foi possível recuperar os usuários.',
        HttpStatus.NOT_FOUND,
      );
    });
  }

  @Get(':email')
  @ApiOperation({ summary: 'Selecionar um usuário' })
  @ApiResponse({ status: 201, description: 'Retornado com sucesso.' })
  @ApiResponse({
    status: 404,
    description: 'Dados inválidos ou não foi possível encontrar o resultado.',
  })
  @ApiHeader({
    name: 'Authorization',
    allowEmptyValue: false,
    required: true,
    description: 'Bearer...',
  })
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('email') email: string) {
    return this.usersService.findOne(email).catch(() => {
      throw new HttpException(
        'Não foi possível recuperar o usuário.',
        HttpStatus.NOT_FOUND,
      );
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um usuário' })
  @ApiResponse({ status: 201, description: 'Editado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou não foi possível atualizar.',
  })
  @ApiHeader({
    name: 'Authorization',
    allowEmptyValue: false,
    required: true,
    description: 'Bearer...',
  })
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto).catch(() => {
      throw new HttpException(
        'Não foi possível atualizar o usuário.',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um usuário' })
  @ApiResponse({ status: 201, description: 'Deletado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou não foi possível excluir.',
  })
  @ApiHeader({
    name: 'Authorization',
    allowEmptyValue: false,
    required: true,
    description: 'Bearer...',
  })
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id).catch(() => {
      throw new HttpException(
        'Não foi possível remover o usuário.',
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
