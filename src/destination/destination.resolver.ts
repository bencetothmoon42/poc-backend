import { Query, Resolver } from '@nestjs/graphql';
import { RequiresPermission } from 'src/auth/decorators/permission/permission.decorator';
import { Permissions } from 'src/auth/decorators/permission/permissions.enum';
import { DestinationService } from './destination.service';
import { DestinationDto } from './dto/destination.dto';

@Resolver('Destination')
export class DestinationResolver {
  constructor(private readonly destinationService: DestinationService) {}

  @RequiresPermission(Permissions.DESTINATION_ALL_READ)
  @Query(() => [DestinationDto])
  async getAllDestinations(): Promise<DestinationDto[]> {
    return await this.destinationService.getAllDestinations();
  }
}
