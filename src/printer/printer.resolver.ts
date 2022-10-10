import { Inject } from '@nestjs/common';
import { Query, Resolver, Subscription } from '@nestjs/graphql';
import { PrinterDto } from './dto/printer.dto';
import { PrinterStatusDto } from './dto/printerStatus.dto';
import { PrinterService } from './printer.service';
import { PubSub } from 'graphql-subscriptions';
//XXX ugly
const pubSub = new PubSub();
let samplePrinters = null; //for testing

//REMOVEME?
let randomth = function (arr) {
	if(!arr) return "foo";
  return arr[Math.floor((Math.random()*arr.length))];
}


@Resolver('Printer')
export class PrinterResolver {
  constructor(
    @Inject(PrinterService)
    private readonly printerService: PrinterService,
  ) {}

	@Query(() => [PrinterDto])
	 async getAllPrinter(): Promise<PrinterDto[]> {
		 let printers =  await this.printerService.getAllPrinters();
		 if(!samplePrinters) samplePrinters = printers.map(x => x.id);
		 return printers;
	 }

	@Subscription(() => PrinterStatusDto,  {resolve: payload => payload}) //FIXME: proper type? why resolve
	async statusUpdate() {
		return pubSub.asyncIterator('statusUpdate');
	}



}

//REMOVEME: infinite event generator for testing 
async function* printerStatus(): AsyncGenerator<any, never>{
	while(true){
		await new Promise(resolve => setTimeout(resolve, 1000));
		yield {id: randomth(samplePrinters), status: 'ok'};
		//yield "ok";
	}
}
//REMOVEME: ugly testing shit
(async ()=>{
	for await (let status of printerStatus()) {
		console.log("remove me later :) "+status);
		pubSub.publish('statusUpdate', status);
	};
})();




