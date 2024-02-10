import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'users/users.service'; // Update import path as necessary

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private readonly userService: UsersService) {
        super();
    }

    serializeUser(user: any, done: Function) {
        done(null, user.id);
    }

    async deserializeUser(userId: string, done: Function) {
        const user = await this.userService.findOne(userId);
        done(null, user);
    }
}