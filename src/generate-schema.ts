// src/generate-schema.ts
import { NestFactory } from '@nestjs/core';
import {
  GraphQLSchemaFactory,
  GraphQLSchemaBuilderModule,
} from '@nestjs/graphql';
import { printSchema } from 'graphql';
import { writeFileSync } from 'fs';
// import { AppModule } from './app.module';
import { UserResolver } from './modules/user/user.resolver';
export default async () => {
  const app = await NestFactory.createApplicationContext(
    GraphQLSchemaBuilderModule,
  );
  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create([UserResolver]);
  writeFileSync('schema.gql', printSchema(schema));
  await app.close();
};
// generateSchema();
