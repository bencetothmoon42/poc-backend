import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { PrinterFilterInput } from './model/printer-filter.input';
import { Printer } from './model/printer.model';

@Injectable()
export class PrinterService {
  constructor(private readonly database: DatabaseService) {}

  async findAll(filter: PrinterFilterInput = {}): Promise<Printer[]> {
    return this.database.printer.findMany({
      where: {
        id: {
          equals: filter.id,
        },
        enabled: {
          equals: filter.enabled,
        },
      },
    });
  }
}
