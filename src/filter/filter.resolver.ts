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
      name: 'paperType',
      filterType: FilterType.MultiSelect,
      values: [
        { name: 'sticky', value: 'sticky' },
        { name: 'label', value: 'label' },
        { name: 'instruction', value: 'instruction' },
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
