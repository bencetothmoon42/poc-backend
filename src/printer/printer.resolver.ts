import { Args, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Printer } from './model/printer.model';
import { PrinterStatus } from './model/printer-status.model';
import { PrinterService } from './printer.service';
import { PubSub } from 'graphql-subscriptions';
import { OnEvent } from '@nestjs/event-emitter';
import { PrinterFilterInput } from './model/printer-filter.input';

@Resolver('Printer')
export class PrinterResolver {
  private pubSub = new PubSub();

  constructor(private readonly printerService: PrinterService) {}

  @Query(() => [Printer])
  async getAllPrinter(
    @Args('filterBy', { nullable: true, type: () => PrinterFilterInput })
    filterBy?: PrinterFilterInput,
  ): Promise<Printer[]> {
    return await this.printerService.findAll(filterBy);
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
