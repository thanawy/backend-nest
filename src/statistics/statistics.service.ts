import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import { Answer } from '@answers/entities/answer.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async getGraphData(
      filters: { subjectId: string; unitId: string; startTime: string; endTime: string; },
      userId: string,
      queryBuilderApply: (queryBuilder: SelectQueryBuilder<Answer>)  => SelectQueryBuilder<Answer>
  ) {

    const queryBuilder = this.answerRepository.createQueryBuilder('answer')
        .select([])
        .leftJoin("answer.question", "question")
        .leftJoin("question.lesson", "lesson")
        .leftJoin("lesson.unit", "unit")
        .leftJoin("unit.subject", "subject")

    if (filters.subjectId){
      queryBuilder.addSelect("unit.id")
        .addGroupBy("unit.id")
        .andWhere("subject.id = :subjectId", { subjectId: filters.subjectId})
    }

    if (filters.unitId){
      queryBuilder.addSelect("lesson.id")
        .addGroupBy("lesson.id")
        .andWhere("unit.id = :unitId", { unitId: filters.unitId})
    }
    if (filters.startTime && filters.endTime){
      queryBuilder.andWhere("answer.created_at between :startTime and :endTime", {startTime: filters.startTime, endTime: filters.endTime})
    }

    queryBuilderApply(queryBuilder);

    const averagePerformance = queryBuilder.getRawMany();
    const userPerformance = queryBuilder.andWhere("answer.user_id = :userId", {userId}).getRawMany()

    return { averagePerformance, userPerformance };
  }

  async getTimeSpentGraph(subjectId: string, unitId: string, startTime: string, endTime: string, userId: string) {
    const filters = {
        subjectId, unitId, startTime, endTime,
    }
    return await this.getGraphData(filters, userId,  (queryBuilder) => {
      return queryBuilder.addSelect('SUM(solution_duration)', "timeSpent")
    });
  }
}
