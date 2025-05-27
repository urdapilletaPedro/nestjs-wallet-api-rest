// src/users/user.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { BaseRepository } from '../common/base/base-repository';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
  constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
    super(userModel);
  }

  public async findByEmail(email: string): Promise<User | null> {
    const query = { email: email };
    const projection = { email: 1, _id: 0 };
    const options: QueryOptions = { projection };

    return this.findOne(query, options);
  }

  public async create(dto: CreateUserDto): Promise<User> {
    return this.createOne(dto);
  }
}
