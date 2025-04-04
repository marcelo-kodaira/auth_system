import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateUserCommand } from '../../../../domain/ports/in/user-use-case.port';

export class CreateUserDto implements CreateUserCommand {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
