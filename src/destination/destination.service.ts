import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DestinationConverter } from './destination.converter';
import { DestinationDto } from './dto/destination.dto';

@Injectable()
export class DestinationService {
  constructor(
    private readonly database: DatabaseService,
    private readonly destinationConverter: DestinationConverter,
  ) {}

  async getAllDestinations(): Promise<DestinationDto[]> {
    const destinations = await this.database.destination.findMany();
    return destinations.map((destination) =>
      this.destinationConverter.toDestinationDto(destination),
    );
  }
}
