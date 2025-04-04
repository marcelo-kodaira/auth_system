import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { AuthUseCasePort } from '../../../../domain/ports/in/auth-use-case.port';

@Controller('auth')
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCasePort) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authUseCase.login(loginDto);
    } catch (error) {
      if (error.message === 'Invalid credentials') {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
