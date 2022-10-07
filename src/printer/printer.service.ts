import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { PrinterDto } from './dto/printer.dto';
import { PrinterConverter } from './printer.converter';

@Injectable()
export class PrinterService {
  constructor(
    private readonly database: DatabaseService,
    private readonly printerConverter: PrinterConverter,
  ) {}

  async getAllPrinter(): Promise<PrinterDto[]> {
    const printers = await this.database.printer.findMany();
    return printers.map((printer) =>
      this.printerConverter.toPrinterDto(printer),
    );
  }
}
