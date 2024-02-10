import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Email not found!');
    }
    if (!(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Password is incorrect!');
    }
    const { password, ...result } = user;
    return result;
  }

  async register(email: string, password: string): Promise<any> {
    // todo: check if user already exists or if password is not strong enough or if email is not valid
    return this.userService.create({ email, password: await bcrypt.hash(password, 10), facebookId: null, displayName: null });
  }


}
