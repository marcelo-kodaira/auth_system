import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { 
  AuthResultDto, 
  AuthUseCasePort, 
  LoginCommand 
} from '../../domain/ports/in/auth-use-case.port';
import { UserUseCasePort } from '../../domain/ports/in/user-use-case.port';

@Injectable()
export class AuthUseCase implements AuthUseCasePort {
  constructor(
    private readonly userUseCase: UserUseCasePort,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userUseCase.findUserByEmail(email);
    
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    
    return null;
  }

  async login(command: LoginCommand): Promise<AuthResultDto> {
    const user = await this.validateUser(command.email, command.password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const payload = { email: user.email, sub: user.id };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }
    };
  }
}
