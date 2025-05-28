import { Controller, UseGuards, Request, Delete, Get } from '@nestjs/common';

import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthRequest } from '../common/interfaces/auth-request.interface';
import { Types } from 'mongoose';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getAllAccounts() {
    return await this.userService.getAllAccounts();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  public async deleteAccount(@Request() req: AuthRequest) {
    const userId: Types.ObjectId = new Types.ObjectId(req.user.userId);
    return await this.userService.deleteAccount(userId);
  }
}
