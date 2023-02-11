import { Module } from '@nestjs/common';
import { AppConfigModule } from './app/config.module';
import { JwtConfigModule } from './jwt/config.module';

@Module({ imports: [AppConfigModule, JwtConfigModule] })
export class RootConfigModule {}
