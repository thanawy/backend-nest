import { CreateUserDto } from 'users/dto/create-user.dto';

export class CreateLocalUserDto extends CreateUserDto {
  constructor(email, password, provider = 'local') {
    super();
    this.email = email;
    this.password = password;
    this.provider = provider;
  }

  email: string;
  password: string;
  provider: string;
}
