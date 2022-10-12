import { Query, Resolver } from '@nestjs/graphql';
import { PrintingJobDto } from './dto/printing-job.dto';
import { PrintingJobService } from './printing-job.service';

@Resolver('PrintingJob')
export class PrintingJobResolver {
  constructor(private readonly printingJobService: PrintingJobService) {}

  @Query(() => [PrintingJobDto])
  async getAllPrintingJobs(): Promise<PrintingJobDto[]> {
    return await this.printingJobService.getAllPrintingJobs();
  }
}
