import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { UserRepositoryPort } from '../../../domain/ports/out/user-repository.port';
import { User } from '../../../domain/entities/user.entity';
import { CreateUserCommand, UpdateUserCommand } from '../../../domain/ports/in/user-use-case.port';

@Injectable()
export class PrismaUserRepository implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: { isActive: true },
    });
    
    return users.map(this.mapToDomainEntity);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    
    if (!user) return null;
    
    return this.mapToDomainEntity(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) return null;
    
    return this.mapToDomainEntity(user);
  }

  async create(data: CreateUserCommand): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      },
    });
    
    return this.mapToDomainEntity(user);
  }

  async update(id: string, data: UpdateUserCommand): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        isActive: data.isActive,
      },
    });
    
    return this.mapToDomainEntity(user);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }

  private mapToDomainEntity(prismaUser: any): User {
    return new User(
      prismaUser.id,
      prismaUser.firstName,
      prismaUser.lastName,
      prismaUser.email,
      prismaUser.password,
      prismaUser.isActive,
      prismaUser.createdAt,
      prismaUser.updatedAt
    );
  }
}
