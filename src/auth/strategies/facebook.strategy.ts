import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { AuthService } from 'auth/auth.service';
import {UsersService} from "../../users/users.service";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor(private authService: AuthService, private userService: UsersService) {
        console.log("facebook strategy")
        super({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            scope: 'email',
            profileFields: ['id', 'displayName', 'emails'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done): Promise<any> {
        console.log("profile: ", profile)
        try {
            const user = await this.userService.findOne(profile.id);
            if (!user) {
                const newUser = await this.userService.create({
                    facebookId: profile.id,
                    email: profile.emails[0].value,
                    displayName: profile.displayName,
                    password: null,
                });
                return done(null, newUser);
            }
            // const { id, displayName, emails } = profile;
            // Implement your logic to find or create a user
            done(null, user)
        } catch (e) {
            console.log("exception: ", e)
        }

    }
}