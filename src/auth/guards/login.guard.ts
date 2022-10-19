import { ExecutionContext, Injectable } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class LoginGuard extends AuthGuard('oauth2') {
  async canActivate(context: ExecutionContext) {
    let ctx: ExecutionContext;
    if (context.getType<GqlContextType>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      const { req, res } = gqlContext.getContext();
      ctx = new ExecutionContextHost([req, res]);
    } else {
      ctx = context;
    }

    console.log({ ctx });

    const result = (await super.canActivate(ctx)) as boolean;
    console.log({ result });
    const request = ctx.switchToHttp().getRequest<Request>();

    console.log({ request });

    await super.logIn(request);

    return result;
  }
}
