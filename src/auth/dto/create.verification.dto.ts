import { PartialType } from '@nestjs/mapped-types';
import { Verification } from '@auth/entities/verification.entity';

export class CreateVerificationDto extends PartialType(Verification) {
  constructor({ code, user }) {
    super();
    this.code = code;
    this.user = user;
  }
}
