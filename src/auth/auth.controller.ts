import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'auth/auth.service';
import { SignInDto } from 'users/dto/sign-in.dto';
import { CreateUserDto } from 'users/dto/create-user.dto';
import * as secureSession from '@fastify/secure-session';
import { FastifyRequest } from 'fastify';
import { LocalGuard } from 'auth/guards/local.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.authService.register(
      createUserDto.email,
      createUserDto.password,
    );
    session.userId = user.id;
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() request, @Body() signInDto: SignInDto) {
    return {
      user: request.user,
      message: 'Login successful',
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('facebook'))
  @Get('facebook')
  async loginWithFacebook() {
    console.log('Redirecting to facebook...');
    return {
      message: 'Redirecting to facebook...',
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('facebook'))
  @Get('facebook/callback')
  async facebookCallback(@Request() req: Record<string, any>) {
    console.log('callback called...');
    return req.user;
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
  async status(
    @Session() session: secureSession.Session,
    @Request() request: FastifyRequest,
  ) {
    return {
      message: 'Session status',
      statusCode: HttpStatus.OK,
      session,
      user: request.user,
    };
  }
}


