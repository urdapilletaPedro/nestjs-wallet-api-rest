import { Injectable, NotFoundException } from '@nestjs/common';
import { WalletDocument } from './schema/wallet.schema';
import { ClientSession, Types } from 'mongoose';
import { WalletRepository } from './wallet.repository';
import { getDefaultBalance } from './constans/defaultBalance';

@Injectable()
export class WalletService {
  constructor(private readonly walletRepo: WalletRepository) {}

  public async getWalletByUserId(
    userId: Types.ObjectId,
  ): Promise<WalletDocument> {
    const wallet = await this.walletRepo.findByUserId(userId.toString());
    if (!wallet) throw new NotFoundException('Wallet not found');
    return wallet;
  }

  public async createWallet(
    userId: Types.ObjectId,
    session: ClientSession,
  ): Promise<WalletDocument> {
    return this.walletRepo.createOne(
      { userId, balance: getDefaultBalance() },
      session,
    );
  }

  public async updateBalance(
    userId: Types.ObjectId,
    coin: string,
    amount: number,
  ) {
    const wallet = await this.getWalletByUserId(userId);
    const current = wallet.balance.get(coin) || 0;
    wallet.balance.set(coin, current + amount);
    return wallet.save();
  }
}
