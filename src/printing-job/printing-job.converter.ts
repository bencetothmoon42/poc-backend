import { Injectable } from '@nestjs/common';
import { PrintingJob } from '@prisma/client';
import { PrintingJobDto } from './dto/printing-job.dto';

@Injectable()
export class PrintingJobConverter {
  toPrintingJobDto(printingJob: PrintingJob): PrintingJobDto {
    return {
      id: printingJob.id,
      counter: printingJob.counter,
      paperType: printingJob.paperType,
      status: printingJob.status,
      timeStarted: printingJob.timeStarted,
    };
  }
}
