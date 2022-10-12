import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from './database/database.module';
import { PrinterModule } from './printer/printer.module';
import { HouseModule } from './house/house.module';
import { DestinationModule } from './destination/destination.module';
import { PrintingJobModule } from './printing-job/printing-job.module';
import { LoginModule } from './auth/login/login.module';
import { PermissionsGuard } from './auth/guards/permissions.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';

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
    LoginModule,
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
  ],
})
export class AppModule {}
