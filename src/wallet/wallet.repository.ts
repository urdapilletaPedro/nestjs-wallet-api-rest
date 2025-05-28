import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet, WalletDocument } from './schema/wallet.schema';
import { BaseRepository } from '../common/base/base-repository';

@Injectable()
export class WalletRepository extends BaseRepository<WalletDocument> {
  constructor(@InjectModel(Wallet.name) walletModel: Model<WalletDocument>) {
    super(walletModel);
  }

  async findByUserId(userId: string) {
    return this.findOne({ userId });
  }
}
