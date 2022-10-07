import { Inject } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { HouseDto } from './dto/house.dto';
import { HouseService } from './house.service';

@Resolver('House')
export class HouseResolver {
  constructor(
    @Inject(HouseService)
    private readonly houseService: HouseService,
  ) {}

  @Query(() => [HouseDto])
  async getAllHouse(): Promise<HouseDto[]> {
    return await this.houseService.getAllHouse();
  }
}
