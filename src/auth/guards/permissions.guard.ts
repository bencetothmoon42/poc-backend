import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permission/permission.decorator';
import { Permissions } from '../decorators/permission/permissions.enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permissions[]>(
      PERMISSIONS_KEY,
      [context.getHandler()],
    );
    if (!requiredPermissions) {
      return true;
    }
    //some logic here

    // const { user } = context.switchToHttp().getRequest();
    // return requiredPermissions.some((permission) =>
    //   user.permissions.includes(permission),
    // );

    return true;
  }
}
