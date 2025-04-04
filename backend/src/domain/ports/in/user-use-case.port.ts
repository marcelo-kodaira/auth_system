import { User } from '../../entities/user.entity';

export interface CreateUserCommand {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdateUserCommand {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  isActive?: boolean;
}

export interface UserUseCasePort {
  createUser(command: CreateUserCommand): Promise<User>;
  findAllUsers(): Promise<User[]>;
  findUserById(id: string): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
  updateUser(id: string, command: UpdateUserCommand): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
