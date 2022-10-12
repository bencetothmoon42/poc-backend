import { Module } from '@nestjs/common';
import { PrinterService } from './printer.service';
import { PrinterResolver } from './printer.resolver';
import { FilterModule } from 'src/common/filter/filter.module';

@Module({
  providers: [PrinterService, PrinterResolver],
  imports: [FilterModule],
})
export class PrinterModule {}
