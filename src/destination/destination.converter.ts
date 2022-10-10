import { Injectable } from '@nestjs/common';
import { Destination } from '@prisma/client';
import { DestinationDto } from './dto/destination.dto';

@Injectable()
export class DestinationConverter {
  toDestinationDto(destination: Destination): DestinationDto {
    return {
      id: destination.id,
      houseId: destination.houseId,
      name: destination.name,
      description: destination.description,
      enabled: destination.enabled,
      location: destination.location,
    };
  }
}
