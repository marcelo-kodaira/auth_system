import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({ 
      where: { email: createUserDto.email } 
    });
    
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    
    const savedUser = await this.userRepository.save(user);
    
    await this.cacheManager.del('all_users');
    
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    const cachedUsers = await this.cacheManager.get<User[]>('all_users');
    
    if (cachedUsers) {
      return cachedUsers;
    }
    
    const users = await this.userRepository.find();
    
    await this.cacheManager.set('all_users', users, 600);
    
    return users;
  }

  async findOne(id: string): Promise<User> {
    const cachedUser = await this.cacheManager.get<User>(`user_${id}`);
    
    if (cachedUser) {
      return cachedUser;
    }
    
    const user = await this.userRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    await this.cacheManager.set(`user_${id}`, user, 600);
    
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    
    Object.assign(user, updateUserDto);
    const updatedUser = await this.userRepository.save(user);
    
    await this.cacheManager.del(`user_${id}`);
    await this.cacheManager.del('all_users');
    
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    await this.cacheManager.del(`user_${id}`);
    await this.cacheManager.del('all_users');
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }
}
