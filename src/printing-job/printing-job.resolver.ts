import { Inject } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { PrintingJobDto } from './dto/printing-job.dto';
import { PrintingJobService } from './printing-job.service';

@Resolver('PrintingJob')
export class PrintingJobResolver {
  constructor(
    @Inject(PrintingJobService)
    private readonly printingJobService: PrintingJobService,
  ) {}

  @Query(() => [PrintingJobDto])
  async getAllPrintingJob(): Promise<PrintingJobDto[]> {
    return await this.printingJobService.getAllPrintingJob();
  }
}
