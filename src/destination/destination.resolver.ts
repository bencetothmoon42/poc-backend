import { Inject } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { DestinationService } from './destination.service';
import { DestinationDto } from './dto/destination.dto';

@Resolver('Destination')
export class DestinationResolver {
  constructor(
    @Inject(DestinationService)
    private readonly destinationService: DestinationService,
  ) {}

  @Query(() => [DestinationDto])
  async getAllDestination(): Promise<DestinationDto[]> {
    return await this.destinationService.getAllDestinations();
  }
}
