import { Injectable } from '@nestjs/common';
import { FilterInput } from 'src/common/filter/filter.input';
import { DatabaseService } from 'src/database/database.service';
import { Printer } from './model/printer.model';

@Injectable()
export class PrinterService {
  constructor(private readonly database: DatabaseService) {}

  async findAll(filters: FilterInput[] = []): Promise<Printer[]> {
    if (filters.length === 0) {
      return this.database.printer.findMany();
    }

    const conditions = [];

    for (const filter of filters) {
      for (const value of filter.values) {
        conditions.push({ [filter.name]: { equals: value } });
      }
    }

    return this.database.printer.findMany({ where: { AND: conditions } });
  }
}
