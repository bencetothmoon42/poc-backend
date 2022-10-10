import { Injectable } from '@nestjs/common';
import { Printer } from '@prisma/client';
import { PrinterDto } from './dto/printer.dto';

@Injectable()
export class PrinterConverter {
  toPrinterDto(printer: Printer): PrinterDto {
    return {
      id: printer.id,
      name: printer.name,
      description: printer.description,
      enabled: printer.enabled,
      activePaperId: printer.activePaperId,
      dataFormat: printer.dataFormat,
      location: printer.location,
      model: printer.model,
      serialNumber: printer.serialNumber,
      comment: printer.comment,
      destinationId: printer.destinationId,
    };
  }
}
