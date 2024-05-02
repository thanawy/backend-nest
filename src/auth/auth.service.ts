import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@users/entities/user.entity';
import { VerificationService } from '@auth/verification.service';
import { EmailService } from '@mailer/mailer.service';
import { CreateLocalUserDto } from '@auth/dto/create.local.user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly verificationService: VerificationService,
    private readonly emailService: EmailService,
  ) {}

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
    if (await this.userService.findByEmail(email)) {
      throw new UnauthorizedException('Email already exists!');
    }
    const user = new CreateLocalUserDto({
      email,
      password: await bcrypt.hash(password, 10),
    });
    return this.userService.create(user);
  }

  async requestVerificationEmail(user: User) {
    if (user === undefined) {
      throw new UnauthorizedException('unauthorized!');
    }

    if (user?.emailVerifiedAt) {
      throw new ForbiddenException('Email already verified!');
    }

    const verification = await this.verificationService.findOrCreate({ user });
    console.log('created verification:', verification);
    const url = `https://ruling-pelican-seriously.ngrok-free.app/auth/verify?code=${verification.code}`;

    await this.emailService.sendVerificationEmail({ url, user });
  }

  async verifyUser(code: string): Promise<any> {
    const verification = await this.verificationService.findByCode(code);
    if (!verification) {
      throw new NotFoundException('Verification not found!');
    }
    const user = await this.userService.findByEmail(verification.user.email);
    console.log('user:', user);
    console.log('verification:', verification);
    if (!user) {
      throw new NotFoundException('Email not found!');
    }
    if (user.emailVerifiedAt) {
      throw new UnauthorizedException('Email already verified!');
    }

    user.emailVerifiedAt = new Date();
    await this.userService.update(user.id, user);
    return user;
  }
}
