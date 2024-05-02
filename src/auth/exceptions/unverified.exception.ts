import { UnauthorizedException } from '@nestjs/common';

export class UnverifiedException extends UnauthorizedException {
  constructor() {
    super('Email Not Verified', {
      cause: new Error(),
      description:
        'User is logged in but did not verify their email, please verify your email to continue.',
    });
  }
}
