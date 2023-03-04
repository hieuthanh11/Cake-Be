import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './models/products/products.module';
import { AuthModule } from './auth/auth.module';
import { RootConfigModule } from './config/root.config.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RolesModule } from './models/roles/roles.module';
import { CategoriesModule } from './models/categories/categories.module';
import { RolesGuard } from './guard/roles.guard';
import { OrderModule } from './models/order/order.module';
import { HttpExceptionFilter } from './prisma-client-exception/http-exception.filter';

@Module({
  imports: [
    PrismaModule,
    ProductsModule,
    RootConfigModule,
    AuthModule,
    RolesModule,
    CategoriesModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
