import { DataSource } from 'typeorm';
import { Program } from '@programs/entities/program.entity';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
export default class ProgramSeed implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await factoryManager.get(Program).saveMany(4);
  }
}
