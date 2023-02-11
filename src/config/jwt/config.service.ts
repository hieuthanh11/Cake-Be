import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService {
  constructor(private configService: ConfigService) {}

  get secret(): string {
    return this.configService.get('jwt.secret');
  }

  get expires(): string {
    return this.configService.get('jwt.expires');
  }
}
