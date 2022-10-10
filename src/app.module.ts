import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from './database/database.module';
import { PrinterModule } from './printer/printer.module';
import { HouseModule } from './house/house.module';
import { DestinationModule } from './destination/destination.module';
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
					//installSubscriptionHandlers: true, //FIXME: outdated nowadays?
					subscriptions: {
						'graphql-ws': true,
						'subscriptions-transport-ws':  true  //needed for backward compatibility in playground
					}
				};
			},
		}),
		DatabaseModule,
		HouseModule,
		DestinationModule,
		PrinterModule,
		MockKafkaModule,
	],
})
export class AppModule {}
