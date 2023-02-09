import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './models/products/products.module';
import { AppConfigModule } from './config/app/config.module';

@Module({
  imports: [PrismaModule, ProductsModule, AppConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
