import { User } from '../../entities/user.entity';
import { CreateUserCommand, UpdateUserCommand } from '../in/user-use-case.port';

export interface UserRepositoryPort {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserCommand): Promise<User>;
  update(id: string, data: UpdateUserCommand): Promise<User>;
  delete(id: string): Promise<void>;
}
