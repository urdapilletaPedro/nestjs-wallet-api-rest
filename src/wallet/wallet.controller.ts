import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WalletService } from './wallet.service';
import { Types } from 'mongoose';
import { AuthRequest } from '../common/interfaces/auth-request.interface';
import { AddBalanceDto } from './dtos/add-balance.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public getUserWallet(@Request() req: AuthRequest) {
    const userId = new Types.ObjectId(req.user.userId);
    return this.walletService.getWalletByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add')
  public addToBalance(
    @Request() req: AuthRequest,
    @Body() body: AddBalanceDto,
  ) {
    const userId = new Types.ObjectId(req.user.userId);
    return this.walletService.updateBalance(userId, body.coin, body.amount);
  }
}
