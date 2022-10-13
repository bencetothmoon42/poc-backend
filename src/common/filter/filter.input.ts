import { Field, ID, InputType } from '@nestjs/graphql';
import { FilterValue, FilterValueScalar } from './filter-value.scalar';

@InputType()
export class FilterInput {
  @Field(() => ID, { description: 'Unique name intended as translation key.' })
  name: string;

  @Field(() => [FilterValueScalar])
  values: FilterValue[];
}

@InputType()
export class FiltersInput {
  @Field(() => [FilterInput])
  filters: FilterInput[];
}
