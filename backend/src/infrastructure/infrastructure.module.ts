import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { PrismaService } from './config/prisma.service';
import { PrismaUserRepository } from './adapters/out/prisma-user.repository';
import { UserController } from './adapters/in/controllers/user.controller';
import { AuthController } from './adapters/in/controllers/auth.controller';
import { JwtStrategy } from './adapters/in/strategies/jwt.strategy';

import { UserRepositoryPort } from '../domain/ports/out/user-repository.port';
import { ApplicationModule } from '../application/application.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''}`,
    }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'your-secret-key'),
        signOptions: { 
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '1h') 
        },
      }),
    }),
    ApplicationModule,
  ],
  controllers: [UserController, AuthController],
  providers: [
    PrismaService,
    JwtStrategy,
    {
      provide: UserRepositoryPort,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [PrismaService, JwtModule],
})
export class InfrastructureModule {}
