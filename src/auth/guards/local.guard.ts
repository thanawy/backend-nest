import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UsersService } from 'users/users.service';
@Injectable()
export class LocalGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext) {
        const result = (await super.canActivate(context)) as boolean
        const request = context.switchToHttp().getRequest()
        await super.logIn(request)
        return result
    }
}



@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private usersService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    // Check if the user object exists in the session
    const isUserAuthenticated = req.session &&
                                req.session.passport &&
                                Boolean(req.session.passport.user);

    console.log("isUserAuthenticated: ", isUserAuthenticated)
    if (isUserAuthenticated) {
      // Attach the user object to the request for subsequent handlers
      const {password, ...rest } = await this.usersService.findOne(req.session.passport.user);
      req.user = rest;
      return true; // Continue with the request
    }

    return false; // Block the request
  }
}
