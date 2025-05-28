import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  public register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  public login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }
}
