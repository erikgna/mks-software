import {
  Controller,
  Req,
  UseGuards,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Fazer login' })
  @ApiResponse({ status: 201, description: 'Token retornado.' })
  @ApiResponse({
    status: 404,
    description: 'Dados inválidos ou usário não encontrado.',
  })
  async login(@Req() req: any) {
    return this.authService.login(req.user).catch(() => {
      throw new HttpException(
        'Não foi possível realizar o login.',
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
