import { Args, Query, Resolver } from '@nestjs/graphql';
import { Collection, Filter, FilterType } from './filter.model';

const mockFilters = {
  Printer: [
    {
      name: 'enabled',
      filterType: FilterType.MultiSelect,
      values: [
        { name: 'yes', value: true },
        { name: 'no', value: false },
      ],
    },
    {
      name: 'activePaperId',
      filterType: FilterType.MultiSelect,
      values: [
        { name: 'sticky', value: 0 },
        { name: 'instruction', value: 1 },
        { name: 'label', value: 2 },
      ],
    },
  ],
};

@Resolver('Filter')
export class FilterResolver {
  @Query(() => [Filter], { name: 'filters' })
  async getFilters(
    @Args({ name: 'collection', type: () => Collection, nullable: true })
    collection?: Collection,
  ): Promise<Filter[]> {
    return mockFilters[collection] ?? [];
  }
}
