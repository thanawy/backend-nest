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
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: Function) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      return done(new UnauthorizedException(), null);
    }
    done(null, user);
  }
}
