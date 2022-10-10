import { Inject } from '@nestjs/common';
import { Query, Resolver, Subscription } from '@nestjs/graphql';
import { PrinterDto } from './dto/printer.dto';
import { PrinterStatusDto } from './dto/printerStatus.dto';
import { PrinterService } from './printer.service';
import { PubSub } from 'graphql-subscriptions';
import { OnEvent } from '@nestjs/event-emitter';

import { MockKafkaService } from 'src/mock/kafka.service';


@Resolver('Printer')
export class PrinterResolver {

	private pubSub = new PubSub();
	
	constructor(
		@Inject(PrinterService)
		private readonly printerService: PrinterService,
	) {}

	@OnEvent('message.rcvd')
	handleStatusUpdate(status){
		this.pubSub.publish('statusUpdate', status);
	}

	@Query(() => [PrinterDto])
	async getAllPrinter(): Promise<PrinterDto[]> {
		let printers =  await this.printerService.getAllPrinters();
		return printers;
	}

	@Subscription(() => PrinterStatusDto ,{resolve: payload => payload}) //FIXME: proper type? why resolve
	async statusUpdate() : Promise<AsyncIterator<PrinterStatusDto>>{
		return this.pubSub.asyncIterator('statusUpdate');
	}

}
