import { Query, Resolver } from '@nestjs/graphql';
import { RequiresPermission } from 'src/auth/decorators/permission/permission.decorator';
import { HouseDto } from './dto/house.dto';
import { HouseService } from './house.service';
import { Permissions } from 'src/auth/decorators/permission/permissions.enum';

@Resolver('House')
export class HouseResolver {
  constructor(private readonly houseService: HouseService) {}

  @RequiresPermission(Permissions.HOUSE_ALL_READ)
  @Query(() => [HouseDto])
  async getAllHouses(): Promise<HouseDto[]> {
    return await this.houseService.getAllHouses();
  }
}
