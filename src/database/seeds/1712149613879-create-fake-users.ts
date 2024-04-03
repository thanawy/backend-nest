import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Program } from '@programs/entities/program.entity';
import { User } from '@users/entities/user.entity';
const random = require('random');
import { pick } from 'random-js';


export class UsersSeed implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const programs = await dataSource.getRepository(Program).find();
    const users = await Promise.all(
      Array(1000)
        .fill('')
        .map(() => factoryManager.get(User).make()),
    );
    users.forEach((user) => {
      user.program = pick({ next: () => random.normal(0, 1)() }, programs);
    });
    await dataSource.getRepository(User).save(users);
  }
}
