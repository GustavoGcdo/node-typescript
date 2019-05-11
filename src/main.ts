import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CustomLogger } from './shared/services/custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: new CustomLogger()
  });
  app.use(compression());

  const options = new DocumentBuilder()
    .setTitle('Petshop API')
    .setDescription('Api do curso 7180')
    .setVersion('1.0.0')
    .addTag('petshop')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
