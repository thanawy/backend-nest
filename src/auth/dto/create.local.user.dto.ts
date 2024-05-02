import { CreateUserDto } from '@users/dto/create.user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class CreateLocalUserDto extends PartialType(CreateUserDto) {
  constructor({ email, password }) {
    super();
    this.email = email;
    this.password = password;
    this.provider = 'local';
  }
}
