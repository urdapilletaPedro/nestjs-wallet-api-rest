import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dtos/register.dto';
import { UserDocument } from '../user/schema/user.schema';
import { IToken } from './interfaces/token.interface';
import { IPayload } from './interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  public async register(registerDto: RegisterDto): Promise<IToken> {
    const { email, password } = registerDto;

    const hash = await bcrypt.hash(password, 10);
    const newUser: UserDocument = await this.userService.create({ email, password: hash });

    const payload: IPayload = { sub: newUser.id };

    return await this.generateToken(payload);
  }

  public async login(email: string, password: string): Promise<IToken> {
    const user: UserDocument = await this.userService.findByEmail(email);

    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload: IPayload = { sub: user.id};

    return this.generateToken(payload);
  }

  private async generateToken(payload: IPayload): Promise<IToken> {
    const token: string = await this.jwtService.signAsync(payload);
    return {token: token};
  }
}
