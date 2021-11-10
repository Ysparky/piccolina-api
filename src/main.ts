import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // NOTE: added security
  app.use(helmet());

  // NOTE: rateLimit
  app.use(
    rateLimit({
      windowMs: 1000 * 60 * 60, // an hour
      max: 10000, // limit each IP to 100 requests per windowMs
      message:
        '⚠️  Too many request created from this IP, please try again after an hour',
    }),
  );

  await app.listen(3000);
}
bootstrap();
