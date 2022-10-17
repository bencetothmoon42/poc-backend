import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Printer {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  enabled: boolean;

  @Field(() => Int)
  activePaperId: number;

  @Field()
  dataFormat: string;

  @Field()
  location: string;

  @Field()
  model: string;

  @Field()
  serialNumber: string;

  @Field()
  comment: string;

  @Field({ nullable: true })
  destinationId?: string;
}
