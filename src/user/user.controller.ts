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
  public getAllAccounts() {
    return this.userService.getAllAccounts();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  public deleteAccount(@Request() req: AuthRequest) {
    const userId: Types.ObjectId = new Types.ObjectId(req.user.userId);
    return this.userService.deleteAccount(userId);
  }
}
