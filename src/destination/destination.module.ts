import { Module } from '@nestjs/common';
import { DestinationConverter } from './destination.converter';
import { DestinationResolver } from './destination.resolver';
import { DestinationService } from './destination.service';

@Module({
  providers: [DestinationService, DestinationResolver, DestinationConverter],
})
export class DestinationModule {}
