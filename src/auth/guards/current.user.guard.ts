import {
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '@users/users.service';

// export const CurrentUser = createParamDecorator(async (data, req) => {
//   req.user = req.session.passport.user;
//   return true;
// });

@Injectable()
export class CurrentUserGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    if (req.session?.passport?.user !== undefined) {
      req.user = await this.usersService.findOne(req.session?.passport?.user);
    }
    return true;
  }
}
