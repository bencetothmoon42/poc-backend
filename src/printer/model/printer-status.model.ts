import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PrinterStatus {
  @Field(() => ID)
  id: string;

  @Field()
  status: string;
}
