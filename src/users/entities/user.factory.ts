import { User } from '@users/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import { CreateLocalUserDto } from '../../auth/dto/create.local.user.dto';

export default setSeederFactory(User, (faker) => {
  const user = {
    email: faker.internet.email({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    }),
    password: faker.internet.password(),
  };
  return new CreateLocalUserDto(user);
});
