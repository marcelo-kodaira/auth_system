import { IsBoolean, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { UpdateUserCommand } from '../../../../domain/ports/in/user-use-case.port';

export class UpdateUserDto implements UpdateUserCommand {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
  
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
