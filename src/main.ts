import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config({ path: process.cwd() + `/.env.${process.env.NODE_ENV}` });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}

async function start() {
  await bootstrap();
}
start()
  .then(() => {
    console.log(`Server started successfully at port ${process.env.PORT} `);
  })
  .catch((error) => {
    console.error('Error starting server:', error);
  });
