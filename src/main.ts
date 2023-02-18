import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';
import * as cookieParser from 'cookie-parser';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(compression());
  const configService = app.get(AppConfigService);

  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false })); // apply pipe validation

  // prefix
  app.setGlobalPrefix('v1');

  const config = new DocumentBuilder()
    .setTitle('Cake')
    .setDescription('The Cake API description')
    .addBearerAuth()
    .setVersion('0.1')
    .build();

  // somewhere in your initialization file
  app.use(cookieParser());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(8080, () =>
    console.info(
      `Server ${configService.name} running http://localhost:${configService.port}/api`,
    ),
  );
}
bootstrap();
