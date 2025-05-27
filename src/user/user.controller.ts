import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':email')
  public async findByEmail(@Param('email') email: string) {
    return await this.userService.findByEmail(email);
  }

  @Post('create')
  public async createUser(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }
}
