import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

NestFactory.create(AppModule).then((app) => {
  app.enableCors({
    origin: (process.env.ALLOWED_ORIGINS || '').split(','),
  });

  return app.listen(process.env.PORT || 3000);
});
