import { Injectable, ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class LocalGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext) {
        await console.log("login guard")
        const result = (await super.canActivate(context)) as boolean
        const request = context.switchToHttp().getRequest()
        await console.log("about to login")
        await super.logIn(request)
        return result
    }
}