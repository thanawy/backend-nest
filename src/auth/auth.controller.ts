import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import * as secureSession from '@fastify/secure-session';
import { FastifyRequest } from 'fastify';
import { LocalGuard } from 'auth/guards/local.guard';
import { AuthenticatedGuard } from '@auth/guards/authenticated.guard';
import { FacebookGuard } from '@auth/guards/facebook.guard';
import { User } from '@auth/decorators/user.decorator';
import { EmailService } from '@mailer/mailer.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() credentials: any,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.authService.register(
      credentials.email,
      credentials.password,
    );
    session.userId = user.id;
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() request) {
    return {
      user: request.user,
      message: 'Login successful',
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(FacebookGuard)
  @Get('facebook')
  async loginWithFacebook() {
    return {
      message: 'Redirecting to facebook...',
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(FacebookGuard)
  @Get('facebook/callback')
  async facebookCallback(@Request() request: Record<string, any>) {
    return {
      user: request.user,
      message: 'Login successful',
    };
  }

  @Post('logout')
  async logout(@Session() session: Record<string, any>) {
    await session.destroy();
    return {
      message: 'Logout successful',
      statusCode: HttpStatus.OK,
    };
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  @HttpCode(HttpStatus.OK)
  async status(
    @Session() session: secureSession.Session,
    @Request() request: FastifyRequest,
    @User() user,
  ) {
    return {
      message: 'Session status',
      session,
      user: user,
    };
  }

  @Get('request-verification/email')
  async requestVerificationEmail(@User() user) {
    await this.authService.requestVerificationEmail(user);
    return {
      message: 'verification email sent',
      user: user,
    };
  }

  @Get('verify')
  async verify(@Query('code') code: string) {
    const user = await this.authService.verifyUser(code);
    return {
      message: `email ${user.email} is verified successfully!`,
    };
  }
}
