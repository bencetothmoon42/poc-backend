import { Module } from '@nestjs/common';
import { PrinterService } from './printer.service';
import { PrinterResolver } from './printer.resolver';
import { PrinterConverter } from './printer.converter';

@Module({
  providers: [PrinterService, PrinterResolver, PrinterConverter],
})
export class PrinterModule {}
