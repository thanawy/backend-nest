import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateLocalUserDto } from './dto/create.local.user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Email not found!');
    }
    // if (!(await bcrypt.compare(pass, user.password))) {
      if(pass !== user.password) {
      throw new UnauthorizedException('Password is incorrect!');
    }
    const { password, ...result } = user;
    return result;
  }

  async register(email: string, password: string): Promise<any> {
    if (await this.userService.findByEmail(email)) {
      throw new UnauthorizedException('Email already exists!');
    }
    const user = new CreateLocalUserDto({
      email: email,
      password: await bcrypt.hash(password, 10),
    });
    return this.userService.create(user);
  }
}
