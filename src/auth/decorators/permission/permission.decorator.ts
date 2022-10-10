import { SetMetadata } from '@nestjs/common';
import { Permissions } from './permissions.enum';

export const PERMISSIONS_KEY = 'permissions';
export const RequiresPermission = (...permissions: Permissions[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
