import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { LoginCommand } from '../../../../domain/ports/in/auth-use-case.port';

export class LoginDto implements LoginCommand {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
