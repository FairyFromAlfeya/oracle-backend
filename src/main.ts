import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

NestFactory.create(AppModule).then((app) =>
  app.listen(process.env.PORT || 3000),
);
