import {
  Body,
  Controller, Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'auth/auth.service';
import { SignInDto } from 'users/dto/sign-in.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

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
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() signInDto: SignInDto) {
    return {
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
  async facebookCallback(@Req() req: Record<string, any>) {
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
}
