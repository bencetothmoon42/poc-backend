import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { HelloModule } from './hello/hello.module';

@Module({
  imports: [
    HelloModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => {
        return {
          autoSchemaFile: './src/schema.graphql',
        };
      },
    }),
  ],
})
export class AppModule {}
