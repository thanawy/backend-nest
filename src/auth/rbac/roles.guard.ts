// guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@auth/rbac/decorators/roles.decorator';
import { Permission } from '@auth/rbac/entities/permission.entity';
import { RolesService } from '@auth/rbac/roles/roles.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private rolesService: RolesService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true; // No permissions required, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const userPermissions = await this.rolesService.getUserPermissions(user);

    // console.log("===========>", requiredPermissions);
    // console.log("===========>", userPermissions);
    // return userPermissions.some((permission) => permission.action === requiredPermissions[0].action && permission.resource === requiredPermissions[0].resource);
   
    return requiredPermissions.every((permission) => userPermissions.some((userPermission) => userPermission.equals(permission)));

  }
}