import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PrinterDto {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => Number)
  activePaperId: number;

  @Field(() => String)
  dataFormat: string;

  @Field(() => String)
  location: string;

  @Field(() => String)
  model: string;

  @Field(() => String)
  serialNumber: string;

  @Field(() => String)
  comment: string;

  @Field(() => String, { nullable: true })
  destinationId: string | null;
}
