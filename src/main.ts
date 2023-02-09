import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(AppConfigService);

  const config = new DocumentBuilder()
    .setTitle('Cake')
    .setDescription('The Cake API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(8080, () =>
    console.info(
      `Server ${configService.name} running http://localhost:${configService.port}/`,
    ),
  );
}
bootstrap();
