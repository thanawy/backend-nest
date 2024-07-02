import { Module } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { UsersModule } from 'users/users.module';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from 'auth/session.serializer';
import { LocalStrategy } from 'auth/strategies/local.strategy';
import { FacebookStrategy } from 'auth/strategies/facebook.strategy';
import { AuthController } from '@auth/auth.controller';
import { RolesService } from '@auth/rbac/roles/roles.service';
import { EmailModule } from '@mailer/mailer.module';
import { VerificationService } from '@auth/verification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Verification } from '@auth/entities/verification.entity';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ session: true }),
    EmailModule,
    TypeOrmModule.forFeature([Verification]),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    FacebookStrategy,
    SessionSerializer,
    RolesService,
    EmailModule,
    VerificationService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
