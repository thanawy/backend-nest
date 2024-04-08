import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Subject } from '@subjects/entities/subject.entity';
import { Program } from '@programs/entities/program.entity';
import { picker, sample } from 'random-js';
import { gaussianEngine } from '../../tools/gaussian.engine';
import { makeMany } from '../../tools/factory.maker';

const random = require('random');

export class SubjectSeed implements Seeder {
  track = true;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const programs = await dataSource.getRepository(Program).find();
    const subjects = await makeMany(factoryManager.get(Subject), 17, {
      programs: sample(gaussianEngine, programs, random.int(1, 4)),
    });
    await dataSource.getRepository(Subject).save(subjects);
  }
}
