import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findByEmail(email: string): Promise<UserDocument> {
    return this.userRepository.findByEmail(email);
  }

  public async create(dto: CreateUserDto): Promise<UserDocument> {
    return this.userRepository.create(dto);
  }
}
