import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UnverifiedException } from '@auth/exceptions/unverified.exception';
import { UsersService } from '@users/users.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    if (req.user && req.user.emailVerifiedAt === null) {
      throw new UnverifiedException();
    }
    return req.user?.deletedAt === null;
  }
}
