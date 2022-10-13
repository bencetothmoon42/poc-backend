import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  FilterValue,
  FilterValueScalar,
} from 'src/common/filter/filter-value.scalar';

@ObjectType()
export class FilterValueItem {
  @Field(() => ID, { description: 'Unique name intended as translation key.' })
  name: string;

  @Field(() => FilterValueScalar)
  value: FilterValue;
}

@ObjectType()
export class Filter {
  @Field(() => ID, { description: 'Unique name intended as translation key.' })
  name: string;

  @Field(() => FilterType)
  filterType: FilterType;

  @Field(() => [FilterValueItem])
  values: FilterValueItem[];
}

@ObjectType()
export class Filters {
  @Field(() => [Filter])
  filters: Filter[];
}

export enum FilterType {
  MultiSelect = 'MultiSelect',
}

export enum Collection {
  Printer = 'Printer',
}

registerEnumType(FilterType, { name: 'FilterType' });
registerEnumType(Collection, { name: 'Collection' });
