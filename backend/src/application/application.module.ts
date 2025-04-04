import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserUseCase } from './use-cases/user.use-case';
import { AuthUseCase } from './use-cases/auth.use-case';

import { USER_REPOSITORY, USER_USE_CASE, AUTH_USE_CASE } from '../domain/ports/tokens';

@Module({
  providers: [
    {
      provide: USER_USE_CASE,
      useFactory: (userRepository: any) => {
        return new UserUseCase(userRepository);
      },
      inject: [USER_REPOSITORY],
    },
    {
      provide: AUTH_USE_CASE,
      useFactory: (userUseCase: any, jwtService: JwtService) => {
        return new AuthUseCase(userUseCase, jwtService);
      },
      inject: [USER_USE_CASE, JwtService],
    },
  ],
  exports: [USER_USE_CASE, AUTH_USE_CASE],
})
export class ApplicationModule {}
