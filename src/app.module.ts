import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './controllers/cats/cats.controller';
import { CatsService } from './controllers/cats/cats.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from './modules/database/drizzle.module';
import { OpenAiService } from './services/openai.service';
import { SseService } from './services/sse.service';
import { DatabaseService } from './modules/database/db.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from './modules/user/user.resolver';
import { UserService } from './modules/user/user.service';
import { UserModule } from './modules/user/user.module';
import { join } from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DrizzleModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // or autoSchemaFile: join(process.cwd(), 'src/schema.gql')
      playground: false,
    }),
    UserModule,
  ],
  controllers: [AppController, CatsController],
  providers: [
    AppService,
    CatsService,
    OpenAiService,
    SseService,
    DatabaseService,
    UserResolver,
    UserService,
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
