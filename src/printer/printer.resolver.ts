import { Args, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Printer } from './model/printer.model';
import { PrinterStatus } from './model/printer-status.model';
import { PrinterService } from './printer.service';
import { PubSub } from 'graphql-subscriptions';
import { OnEvent } from '@nestjs/event-emitter';
import { FiltersInput } from 'src/common/filter/filter.input';

@Resolver('Printer')
export class PrinterResolver {
  private pubSub = new PubSub();

  constructor(private readonly printerService: PrinterService) {}

  @Query(() => [Printer], { name: 'printers' })
  async getPrinters(
    @Args({ name: 'filterBy', type: () => FiltersInput, nullable: true })
    filterBy?: FiltersInput,
  ): Promise<Printer[]> {
    return await this.printerService.findAll(filterBy.filters);
  }

  @OnEvent('message.rcvd')
  handleStatusUpdate(status: PrinterStatus) {
    this.pubSub.publish('statusUpdate', status);
  }

  // FIXME: proper type? why resolve
  @Subscription(() => PrinterStatus, { resolve: (payload) => payload })
  async statusUpdate(): Promise<AsyncIterator<PrinterStatus>> {
    return this.pubSub.asyncIterator('statusUpdate');
  }
}
