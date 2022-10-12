import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql';
import { ScalarType } from './scalar-type';

@InputType()
export class FilterValueInput {
  @Field(() => ID, { description: 'Unique name intended as translation key.' })
  name: string;

  // We need to explicitly send the value type because GraphQL does not support
  // a Scalar union type that would be the ideal type for the value field.
  @Field(() => ScalarType, { defaultValue: ScalarType.String })
  type: ScalarType;

  @Field()
  value: string;
}

@InputType()
export class FilterInput {
  @Field(() => ID, { description: 'Unique name intended as translation key.' })
  name: string;

  @Field(() => FilterType)
  type: FilterType;

  @Field(() => [FilterValueInput])
  values: FilterValueInput[];
}

@InputType()
export class FiltersInput {
  @Field(() => [FilterInput])
  filters: FilterInput[];
}

export enum FilterType {
  Property = 'Property',
}

registerEnumType(FilterType, { name: 'FilterType' });
