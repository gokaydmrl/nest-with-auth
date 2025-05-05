import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}

async function start() {
  await bootstrap();
}
start()
  .then(() => {
    console.log('Server started successfully');
  })
  .catch((error) => {
    console.error('Error starting server:', error);
  });
