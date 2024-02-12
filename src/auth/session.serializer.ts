import { Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Authenticator } from '@fastify/passport';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {

  constructor(private readonly usersService: UsersService) {
    super();
  }
  serializeUser(user: User, done: Function) {
    console.log("session serializer")
    done(null, user.id);
    console.log("session serialized")
  }

  async deserializeUser(userId: string, done: Function) {
    console.log("deserializeUser: ", userId)
    const user = await this.usersService.findOne(userId);
    if (!user) {
      return done(new UnauthorizedException(), null);
    }
    console.log("deserializedUser: ", user)
    done(null, user);
  }
}
