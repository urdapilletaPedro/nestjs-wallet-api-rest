import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private users = []; // Simulación. Usá Mongo o tu DB real.

  constructor(private jwtService: JwtService) {}

  //   async register(email: string, password: string) {
  //     const hash = await bcrypt.hash(password, 10);
  //     this.users.push({ email, password: hash });
  //     return { message: 'User registered' };
  //   }

  //   async login(email: string, password: string) {
  //     const user = this.users.find((u) => u.email === email);
  //     if (!user) throw new Error('User not found');

  //     const isMatch = await bcrypt.compare(password, user.password);
  //     if (!isMatch) throw new Error('Invalid credentials');

  //     const payload = { sub: user.email, email: user.email };
  //     const token = await this.jwtService.signAsync(payload);

  //     return { access_token: token };
  //   }

  //   async getProfile(email: string) {
  //     return this.users.find((u) => u.email === email);
  //   }
}
