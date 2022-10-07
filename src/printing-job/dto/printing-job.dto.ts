import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PrintingJobDto {
  @Field(() => ID)
  id: string;

  @Field(() => Boolean)
  status: boolean;

  @Field(() => String)
  timeStarted: string;

  @Field(() => String)
  paperType: string;

  @Field(() => String)
  counter: string;
}
