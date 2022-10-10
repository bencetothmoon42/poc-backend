import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DestinationDto {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  houseId: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => String)
  location: string;
}
