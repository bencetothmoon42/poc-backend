import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PrinterStatusDto {
	@Field(() => ID, { nullable: true })
  id: string;

	@Field(() => String, { nullable: true })
  status: string;

}
