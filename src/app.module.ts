import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './controllers/cats.controller';
import { CatsService } from './controllers/cats.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { SaveUserController } from './controllers/saveUser/saveUser.controller';
import { SaveUserService } from './controllers/saveUser/saveUser.service';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from './db/drizzle.module';
import { OpenAiService } from './services/openai.service';
import { SseService } from './services/sse.service';
import { DatabaseService } from './services/db.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DrizzleModule,
  ],
  controllers: [AppController, CatsController, SaveUserController],
  providers: [
    AppService,
    CatsService,
    SaveUserService,
    OpenAiService,
    SseService,
    DatabaseService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({
        path: 'saveUser/save',
        method: RequestMethod.POST,
      })
      .forRoutes('*');
  }
}
