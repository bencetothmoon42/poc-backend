import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { PrintingJobDto } from './dto/printing-job.dto';
import { PrintingJobConverter } from './printing-job.converter';

@Injectable()
export class PrintingJobService {
  constructor(
    private readonly database: DatabaseService,
    private readonly printingJobConverter: PrintingJobConverter,
  ) {}

  async getAllPrintingJob(): Promise<PrintingJobDto[]> {
    const printingJobs = await this.database.printingJob.findMany();
    return printingJobs.map((printingJob) =>
      this.printingJobConverter.toPrintingJobDto(printingJob),
    );
  }
}
