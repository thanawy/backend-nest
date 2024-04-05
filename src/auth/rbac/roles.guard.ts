// guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@auth/rbac/decorators/roles.decorator';
import { RoleService } from '@auth/rbac/role.service';
import { Permission } from '@auth/rbac/entities/permission.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredPermissions) {
      return true; // No permissions required, allow access
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user.id; // Assuming you have user object in request

    const userPermissions = await this.roleService.getUserPermissions(userId);

    // Check if the user has any of the required permissions
    return requiredPermissions.some(permission =>
      userPermissions.some(userPermission =>
        userPermission.action === permission.action && userPermission.resource === permission.resource
      )
    );
  }
}