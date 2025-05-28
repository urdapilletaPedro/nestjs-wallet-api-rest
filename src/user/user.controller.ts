import { Controller, Get, UseGuards, Request } from '@nestjs/common';

import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthRequest } from '../common/interfaces/auth-request.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Request() req: AuthRequest) {
    return req.user.userId;
  }
}
