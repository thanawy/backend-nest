import { CreateUserDto } from '@users/dto/create.user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class CreateFacebookUserDto extends PartialType(CreateUserDto) {
  constructor({ email, id, displayName }) {
    super();
    this.email = email;
    this.providerId = id;
    this.displayName = displayName;
    this.provider = 'facebook';
    this.emailVerifiedAt = new Date();
  }
}
