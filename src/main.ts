import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Championship')
    .setVersion(process.version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger_api', app, document);

  await app.listen(9000);
}
bootstrap();
