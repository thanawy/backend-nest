import { CreateUserDto } from 'users/dto/create-user.dto';

export class CreateFacebookUserDto extends CreateUserDto {

  constructor(email, facebookId, displayName, provider = 'facebook') {
    super();
    this.email = email;
    this.facebookId = facebookId;
    this.displayName = displayName;
    this.provider = provider;
  }

  email: string;
  facebookId: string;
  displayName: string;
  provider = 'facebook';
}
