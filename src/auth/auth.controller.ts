import { Controller, Post, Body, Get, Request, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Account } from '@prisma/client';
import { Response } from 'express';
import { Public } from 'src/decorators/public.decorator';
import { excludeUser } from 'src/utils/utils';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiBearerAuth()
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const cookie = await this.authService.login(loginDto);
    response.setHeader('Set-Cookie', cookie);
    // response.cookie('Set-Cookie', cookie, { httpOnly: true });
    return response.send({ message: 'login success' });
  }

  @Get('profile')
  profile(@Request() request): Omit<Account, 'password'> {
    return excludeUser(request['user'], ['password']);
  }

  @Post('log-out')
  async logOut(@Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }
}
