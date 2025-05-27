import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //   @Post('register')
  //   register(@Body() dto: RegisterDto) {
  //     return this.authService.register(dto.email, dto.password);
  //   }

  //   @Post('login')
  //   login(@Body() dto: LoginDto) {
  //     return this.authService.login(dto.email, dto.password);
  //   }

  //   @UseGuards(JwtAuthGuard)
  //   @Get('profile')
  //   profile(@Req() req: any) {
  //     return this.authService.getProfile(req.user.email);
  //   }
}
