import { Query, Resolver } from '@nestjs/graphql';
import { PrinterDto } from './dto/printer.dto';
import { PrinterService } from './printer.service';

@Resolver('Printer')
export class PrinterResolver {
  constructor(private readonly printerService: PrinterService) {}

  @Query(() => [PrinterDto])
  async getAllPrinters(): Promise<PrinterDto[]> {
    return await this.printerService.getAllPrinters();
  }
}
