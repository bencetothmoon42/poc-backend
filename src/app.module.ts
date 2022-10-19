import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from './database/database.module';
import { PrinterModule } from './printer/printer.module';
import { HouseModule } from './house/house.module';
import { DestinationModule } from './destination/destination.module';
import { PrintingJobModule } from './printing-job/printing-job.module';
import { PermissionsGuard } from './auth/guards/permissions.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { MockKafkaModule } from './mock/kafka.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { resolvers } from './common/resolvers';
import { FilterModule } from './filter/filter.module';
import { LoginGuard } from './auth/guards/login.guard';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    EventEmitterModule.forRoot(),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      resolvers,
      autoSchemaFile: './src/schema.graphql',
      context: ({ req, res }) => ({ req, res }),
      // install SubscriptionHandlers: true,
      // FIXME: outdated nowadays?
      subscriptions: {
        'graphql-ws': true,
        // needed for backward compatibility in playground
        'subscriptions-transport-ws': true,
      },
    }),
    DatabaseModule,
    HouseModule,
    DestinationModule,
    PrinterModule,
    PrintingJobModule,
    MockKafkaModule,
    FilterModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
  ],
})
export class AppModule {}
