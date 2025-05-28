// src/users/user.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions, Types } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { BaseRepository } from '../common/base/base-repository';
import { RegisterDto } from 'src/auth/dtos/register.dto';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
  constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
    super(userModel);
  }

  public async findByEmail(email: string): Promise<UserDocument> {
    const query = { email: email };
    const projection = { email: 1, password: 1, _id: 1 };
    const options: QueryOptions = { projection };

    const user: UserDocument | null = await this.findOne(query, options);

    if (!user) {
      throw new NotFoundException('The user was not found');
    }

    return user;
  }

  public async create(dto: RegisterDto): Promise<UserDocument> {
    return this.createOne(dto);
  }

  public async deleteAccount(userId: Types.ObjectId): Promise<void> {
    const deletedAccount: UserDocument | null = await this.deleteById(userId);

    if (!deletedAccount) {
      throw new NotFoundException('The account was not found');
    }

    return;
  }
}
