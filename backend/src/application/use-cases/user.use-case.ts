import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { CreateUserCommand, UpdateUserCommand, UserUseCasePort } from '../../domain/ports/in/user-use-case.port';
import { UserRepositoryPort } from '../../domain/ports/out/user-repository.port';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserUseCase implements UserUseCasePort {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async createUser(command: CreateUserCommand): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(command.email);
    
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(command.password, 10);
    
    return this.userRepository.create({
      ...command,
      password: hashedPassword,
    });
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async updateUser(id: string, command: UpdateUserCommand): Promise<User> {
    const user = await this.findUserById(id);
    
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    const updateData = { ...command };
    
    if (command.password) {
      updateData.password = await bcrypt.hash(command.password, 10);
    }
    
    return this.userRepository.update(id, updateData);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    await this.userRepository.delete(id);
  }
}
