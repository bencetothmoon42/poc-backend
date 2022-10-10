import { Module } from '@nestjs/common';
import { PrintingJobService } from './printing-job.service';
import { PrintingJobResolver } from './printing-job.resolver';
import { PrintingJobConverter } from './printing-job.converter';

@Module({
  providers: [PrintingJobService, PrintingJobResolver, PrintingJobConverter],
})
export class PrintingJobModule {}
