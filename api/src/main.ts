import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // TODO could hide the port that is being listened to in .env
  await app.listen(3000);
}
bootstrap();
