import { Logger, Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { OnEvent, EventEmitter2 } from '@nestjs/event-emitter';

import *  as crypto from  'crypto';

@Injectable()
export class MockKafkaService {

	constructor(private eventEmitter: EventEmitter2){};

	private readonly logger = new Logger(MockKafkaService.name);
	private ids =  [];
	private running = false;

	async onModuleInit() {
		//create a testing status stream generator
		this.logger.log("mocked kafka generator starting");
		//start infinite producer loop
		this.running = true;
		this.run();
	}

	consume(msg){
		this.eventEmitter.emit('message.rcvd', msg);
	}
	
	async *printerStatus(): AsyncGenerator<{id:string, status:string}, void>{
		while(this.running){
			await new Promise(resolve => setTimeout(resolve, 1000));
			yield {id: crypto.randomUUID(), status: 'ok'};
		}
	}

	async run(){
		for await (let status of this.printerStatus()) {
			this.logger.log(`produced ${JSON.stringify(status)}`);
			this.consume(status);
		};
	}

	async onModuleDestroy(){
		//cleanup&terminate
		this.logger.log('terminating');
		this.running = false;
	}


}






