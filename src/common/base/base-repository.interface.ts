import {
  ClientSession,
  FilterQuery,
  QueryOptions,
  Types,
  UpdateQuery,
  UpdateWithAggregationPipeline,
  UpdateWriteOpResult,
} from 'mongoose';

export interface IBaseRepository<T> {
  findAll(options?: QueryOptions): Promise<T[]>;
  find(query: FilterQuery<T>, options?: QueryOptions): Promise<T[]>;
  findOne(query: FilterQuery<T>, options?: QueryOptions): Promise<T | null>;
  findById(id: Types.ObjectId, options?: QueryOptions): Promise<T | null>;

  createOne(
    data: Partial<T>,
    options?: QueryOptions,
    session?: ClientSession,
  ): Promise<T>;

  insertMany(data: Partial<T>[], session?: ClientSession): Promise<T[]>;

  update(
    query: FilterQuery<T>,
    update: UpdateQuery<T>,
    options?: QueryOptions,
    session?: ClientSession,
  ): Promise<T | null>;

  updateOne(
    query: FilterQuery<T>,
    update: UpdateQuery<T> | UpdateWithAggregationPipeline,
    options?: QueryOptions,
    session?: ClientSession,
  ): Promise<UpdateWriteOpResult | null>;

  updateMany(
    query: FilterQuery<T>,
    update: UpdateQuery<T> | UpdateWithAggregationPipeline,
    options?: QueryOptions,
    session?: ClientSession,
  ): Promise<UpdateWriteOpResult | null>;

  deleteOne(
    query: FilterQuery<T>,
    options?: QueryOptions,
    session?: ClientSession,
  ): Promise<T | null>;

  deleteById(
    id: string | Types.ObjectId,
    options?: QueryOptions,
    session?: ClientSession,
  ): Promise<T | null>;
}
