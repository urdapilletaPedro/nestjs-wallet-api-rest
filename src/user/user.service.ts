import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './schema/user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  public async create(dto: CreateUserDto): Promise<User> {
    return this.userRepository.create(dto);
  }
}
