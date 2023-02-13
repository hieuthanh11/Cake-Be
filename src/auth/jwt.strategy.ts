import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConfigService } from 'src/config/jwt/config.service';
import { EncodeToken } from './dto/token';
import { UsersService } from 'src/models/users/users.service';
import { Request } from 'express';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly jwtConfigService: JwtConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies['Authentication'];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConfigService.secret,
    });
  }

  // encode token
  async validate(payload: EncodeToken) {
    const user = await this.userService.findUserName(payload.username);
    return user;
  }
}
