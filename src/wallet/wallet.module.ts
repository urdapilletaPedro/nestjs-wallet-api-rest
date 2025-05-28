import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './schema/wallet.schema';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { WalletRepository } from './wallet.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
  ],
  controllers: [WalletController],
  providers: [WalletService, WalletRepository],
  exports: [WalletService],
})
export class WalletModule {}
