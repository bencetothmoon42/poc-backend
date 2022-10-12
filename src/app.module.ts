import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from './database/database.module';
import { PrinterModule } from './printer/printer.module';
import { HouseModule } from './house/house.module';
import { DestinationModule } from './destination/destination.module';
import { PrintingJobModule } from './printing-job/printing-job.module';
import { MockKafkaModule } from './mock/kafka.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => {
        return {
          autoSchemaFile: './src/schema.graphql',
          // install SubscriptionHandlers: true,
          // FIXME: outdated nowadays?
          subscriptions: {
            'graphql-ws': true,
            // needed for backward compatibility in playground
            'subscriptions-transport-ws': true,
          },
        };
      },
    }),
    DatabaseModule,
    HouseModule,
    DestinationModule,
    PrinterModule,
    MockKafkaModule,
    PrintingJobModule,
  ],
})
export class AppModule {}
