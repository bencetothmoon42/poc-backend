import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../decorators/role/role.enum';
import { ROLES_KEY } from '../decorators/role/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    //some logic here

    // const { user } = context.switchToHttp().getRequest();
    // return requiredRoles.some((role) => user.roles?.includes(role));

    return true;
  }
}
