import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from './database/database.module';
import { PrinterModule } from './printer/printer.module';
import { HouseModule } from './house/house.module';
import { DestinationModule } from './destination/destination.module';
import { PrintingJobModule } from './printing-job/printing-job.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => {
        return {
          autoSchemaFile: './src/schema.graphql',
        };
      },
    }),
    DatabaseModule,
    HouseModule,
    DestinationModule,
    PrinterModule,
    PrintingJobModule,
  ],
})
export class AppModule {}
