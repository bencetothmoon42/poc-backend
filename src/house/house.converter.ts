import { Injectable } from '@nestjs/common';
import { House } from '@prisma/client';
import { HouseDto } from './dto/house.dto';

@Injectable()
export class HouseConverter {
  toHouseDto(house: House): HouseDto {
    return {
      id: house.id,
      name: house.name,
    };
  }
}
