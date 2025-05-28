import {
  ClientSession,
  FilterQuery,
  HydratedDocument,
  Model,
  QueryOptions,
  Types,
  UpdateQuery,
  UpdateWithAggregationPipeline,
  UpdateWriteOpResult,
} from 'mongoose';
import { IBaseRepository } from './base-repository.interface';

export class BaseRepository<T> implements IBaseRepository<HydratedDocument<T>> {
  constructor(protected readonly model: Model<T>) {}

  async findAll(options: QueryOptions = {}): Promise<HydratedDocument<T>[]> {
    return this.model.find({}, null, options).exec();
  }

  public async find(
    query: FilterQuery<T>,
    options: QueryOptions = {},
  ): Promise<HydratedDocument<T>[]> {
    return this.model.find(query, null, options).exec();
  }

  public async findOne(
    query: FilterQuery<T>,
    options: QueryOptions = {},
  ): Promise<HydratedDocument<T> | null> {
    return this.model.findOne(query, null, options).exec();
  }

  public async findById(
    id: Types.ObjectId,
    options: QueryOptions = {},
  ): Promise<HydratedDocument<T> | null> {
    return this.model.findById(id, null, options).exec();
  }

  public async createOne(
    data: Partial<T>,
    options: QueryOptions = {},
    session?: ClientSession,
  ): Promise<HydratedDocument<T>> {
    const [created] = await this.model.create([data], { ...options, session });
    return created;
  }

  public async insertMany(
    data: Partial<T>[],
    session?: ClientSession,
  ): Promise<HydratedDocument<T>[]> {
    const result = await this.model.insertMany(data, {
      ordered: true,
      session,
    });
    return result as unknown as HydratedDocument<T>[]; // <-- forzamos el tipo correcto
  }

  public async update(
    query: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: QueryOptions = {},
    session?: ClientSession,
  ): Promise<HydratedDocument<T> | null> {
    return this.model
      .findOneAndUpdate(query, update, { ...options, session })
      .exec();
  }

  public async updateOne(
    query: FilterQuery<T>,
    update: UpdateQuery<T> | UpdateWithAggregationPipeline,
    options?: QueryOptions,
    session?: ClientSession,
  ): Promise<UpdateWriteOpResult | null> {
    return this.model.updateOne(query, update, { options, session }).exec();
  }

  public async updateMany(
    query: FilterQuery<T>,
    update: UpdateQuery<T> | UpdateWithAggregationPipeline,
    options?: QueryOptions,
    session?: ClientSession,
  ): Promise<UpdateWriteOpResult | null> {
    return this.model.updateMany(query, update, { options, session }).exec();
  }

  public async deleteOne(
    query: FilterQuery<T>,
    options: QueryOptions = {},
    session?: ClientSession,
  ): Promise<HydratedDocument<T> | null> {
    return this.model.findOneAndDelete(query, { ...options, session }).exec();
  }

  public async deleteById(
    id: string | Types.ObjectId,
    options: QueryOptions = {},
    session?: ClientSession,
  ): Promise<HydratedDocument<T> | null> {
    return this.model.findByIdAndDelete(id, { ...options, session }).exec();
  }
}
