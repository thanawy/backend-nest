import { Program } from '@programs/entities/program.entity';
import { setSeederFactory } from 'typeorm-extension';
import { CreateProgramDto } from '@programs/dto/create-program.dto';

export default setSeederFactory(Program, (faker) => {
  const program = {
    division: faker.string.alpha(10),
  }
  return new CreateProgramDto(program);
});
