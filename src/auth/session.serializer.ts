import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'users/users.service'; // Update import path as necessary

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UsersService) {
    console.log('session serializer');
    super();
  }

  serializeUser(user: any, done: Function) {
    console.log('serializeUser: ', user);
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: Function) {
    console.log('deserializeUser: ', userId);
    const user = await this.userService.findOne(userId);
    done(null, user);
  }
}
