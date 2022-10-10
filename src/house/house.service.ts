import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { HouseDto } from './dto/house.dto';
import { HouseConverter } from './house.converter';

@Injectable()
export class HouseService {
  constructor(
    private readonly database: DatabaseService,
    private readonly houseConverter: HouseConverter,
  ) {}

  async getAllHouse(): Promise<HouseDto[]> {
    const houses = await this.database.house.findMany();
    return houses.map((house) => this.houseConverter.toHouseDto(house));
  }
}
