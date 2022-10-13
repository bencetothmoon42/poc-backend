import { Module } from '@nestjs/common';
import { PrinterService } from './printer.service';
import { PrinterResolver } from './printer.resolver';

@Module({
  providers: [PrinterService, PrinterResolver],
})
export class PrinterModule {}
