import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';

class UpdateChoiceDto {
    id?: string;
    content?: string;
    isCorrect?: boolean;
}

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
    description?: string;
    choices?: UpdateChoiceDto[];
}
