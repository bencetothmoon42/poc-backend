import { Injectable } from '@nestjs/common';
import { FilterInput, FilterType } from 'src/common/filter/filter.input';
import { DatabaseService } from 'src/database/database.service';
import { Printer } from './model/printer.model';
import { FilterService } from 'src/common/filter/filter.service';

@Injectable()
export class PrinterService {
  constructor(
    private readonly database: DatabaseService,
    private readonly filterService: FilterService,
  ) {}

  async findAll(filters: FilterInput[] = []): Promise<Printer[]> {
    if (filters.length === 0) {
      return this.database.printer.findMany();
    }

    const conditions = [];

    for (const filter of filters) {
      if (filter.type === FilterType.Property) {
        for (const value of filter.values) {
          conditions.push({
            [filter.name]: { equals: this.filterService.parse(value) },
          });
        }
      }
    }

    return this.database.printer.findMany({ where: { AND: conditions } });
  }
}
