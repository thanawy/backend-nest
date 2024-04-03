import { Program } from '@programs/entities/program.entity';

export class CreateProgramDto extends Program {
  constructor(options: { division: string }) {
    super();
    this.division = options.division;
  }
}
