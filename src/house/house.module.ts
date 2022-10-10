import { Module } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseResolver } from './house.resolver';
import { HouseConverter } from './house.converter';

@Module({
  providers: [HouseService, HouseResolver, HouseConverter],
})
export class HouseModule {}
