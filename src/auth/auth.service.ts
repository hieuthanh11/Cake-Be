import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { DecodeToken } from './dto/token';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
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

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { username, password } = loginDto;
    const result = await this.validateUser(username, password);
    if (!result)
      throw new HttpException('account wrong password', HttpStatus.BAD_REQUEST);
    const payload = { username: result.username, id: result.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
