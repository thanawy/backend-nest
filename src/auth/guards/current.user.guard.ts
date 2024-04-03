import {CanActivate, createParamDecorator, ExecutionContext, Inject, Injectable} from '@nestjs/common';

// export const CurrentUser = createParamDecorator(async (data, req) => {
//   req.user = req.session.passport.user;
//   return true;
// });

@Injectable()
export class CurrentUserGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (req.session && req.session.passport && req.session.passport.user !== undefined) {
      req.user = req.session.passport.user;
    }
    return true;
  }
}
