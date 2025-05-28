import { ConflictException, Injectable } from '@nestjs/common';
import { UserDocument } from './schema/user.schema';
import { UserRepository } from './user.repository';
import { Types } from 'mongoose';
import { RegisterDto } from 'src/auth/dtos/register.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getAllAccounts() {
    return this.userRepository.findAll();
  }

  public async findByEmail(email: string): Promise<UserDocument> {
    return this.userRepository.findByEmail(email);
  }

  public async findByUserId(email: string): Promise<UserDocument> {
    return this.userRepository.findByEmail(email);
  }

  public async create(dto: RegisterDto): Promise<UserDocument> {
    await this.checkEmailExistence(dto.email);

    dto.email = dto.email.toLowerCase();
    return this.userRepository.create(dto);
  }

  public async deleteAccount(userId: Types.ObjectId) {
    return this.userRepository.deleteAccount(userId);
  }

  private async checkEmailExistence(email: string): Promise<void> {
    const exists: UserDocument | null = await this.userRepository.findOne({
      email: email,
    });

    if (exists) throw new ConflictException('Email ya registrado');

    return;
  }
}
