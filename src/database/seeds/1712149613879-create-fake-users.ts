import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Program } from '@programs/entities/program.entity';
import { User } from '@users/entities/user.entity';

const random = require('random');
import { pick } from 'random-js';
import { gaussianEngine } from '../../tools/gaussian.engine';
import { makeMany } from '../../tools/factory.maker';

export class UsersSeed implements Seeder {
  track = true;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const programs = await dataSource.getRepository(Program).find();
    const users = await makeMany(factoryManager.get(User), 1000, {
      program: pick(gaussianEngine, programs),
    });
    await dataSource.getRepository(User).save(users);
  }
}
