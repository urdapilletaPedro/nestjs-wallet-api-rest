import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dtos/register.dto';
import { UserDocument } from '../user/schema/user.schema';
import { IToken } from './interfaces/token.interface';
import { IPayload } from './interfaces/payload.interface';
import { WalletService } from '../wallet/wallet.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly walletService: WalletService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  public async register(registerDto: RegisterDto): Promise<IToken> {
    const session = await this.connection.startSession();
    const { email, password } = registerDto;

    try {
      await session.withTransaction(async () => {
        const hash = await bcrypt.hash(password, 10);

        const newUser: UserDocument = await this.userService.create(
          { email, password: hash },
          session,
        );

        await this.walletService.createWallet(newUser.id, session);
      });

      const user: UserDocument = await this.userService.findByEmail(email);
      const payload: IPayload = { sub: user.id };
      return this.generateToken(payload);
    } finally {
      session.endSession();
    }
  }

  public async login(email: string, password: string): Promise<IToken> {
    const user: UserDocument = await this.userService.findByEmail(email);

    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload: IPayload = { sub: user.id };

    return this.generateToken(payload);
  }

  private async generateToken(payload: IPayload): Promise<IToken> {
    const token: string = await this.jwtService.signAsync(payload);
    return { token: token };
  }
}
