import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountsService } from 'src/models/accounts/accounts.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { DecodeToken } from './dto/token';
import { JwtConfigService } from 'src/config/jwt/config.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: AccountsService,
    private jwtService: JwtService,
    private jwtConfigService: JwtConfigService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<DecodeToken | null> {
    const user = await this.userService.findUserName(username);
    if (!user)
      throw new HttpException('account invalid', HttpStatus.BAD_REQUEST);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(loginDto: LoginDto): Promise<string> {
    const { username, password } = loginDto;
    const result = await this.validateUser(username, password);
    if (!result)
      throw new HttpException('account wrong password', HttpStatus.BAD_REQUEST);
    const cookie = this.createCookieWithToken(result.username, result.id);
    return cookie;
  }

  createCookieWithToken(username: string, id: string): string {
    const payload = { username: username, id: id };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfigService.expires}`;
  }

  getCookieForLogOut(): string {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
