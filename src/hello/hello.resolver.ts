import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Hello } from './hello.entity';

@Resolver(() => Hello)
export class HelloResolver {
  @Query(() => Hello)
  getHello(): Hello {
    return { hello: 'Hello World!' };
  }

  @ResolveField(() => String)
  resolvedHello(): string {
    return 'Resolved Hello';
  }
}
