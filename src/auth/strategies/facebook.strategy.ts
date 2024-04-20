import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { AuthService } from 'auth/auth.service';
import { UsersService } from '../../users/users.service';
import { CreateFacebookUserDto } from '../dto/create.facebook.user.dto';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_APP_CALLBACK_URL,
      scope: 'email',
      profileFields: ['id', 'displayName', 'emails'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done,
  ): Promise<any> {
    try {
      const user = await this.userService.findOneByProviderId(
        profile.id,
        'facebook',
      );
      if (!user) {
        const dto = new CreateFacebookUserDto({
          email: profile.emails[0].value,
          id: profile.id,
          displayName: profile.displayName,
        });
        const newUser = await this.userService.create(dto);
        return done(null, newUser);
      }
      done(null, user);
    } catch (e) {
      console.log('exception: ', e);
    }
  }
}
