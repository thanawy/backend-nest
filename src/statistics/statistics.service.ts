import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import { Between } from 'typeorm';
import { Answer } from '@answers/entities/answer.entity';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';

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

    let queryBuilder = this.answerRepository.createQueryBuilder('answer')
        .select()
        .leftJoinAndSelect("answer.question", "question")
        .leftJoinAndSelect("question.lesson", "lesson")
        .leftJoinAndSelect("lesson.unit", "unit")
        .leftJoinAndSelect("unit.subject", "subject")

    if (filters.subjectId){
      queryBuilder = queryBuilder.addSelect("unit.id")
        .addGroupBy("unit.id")
        .where("subject.id = :subjectId", { subjectId: filters.subjectId})
    }

    if (filters.unitId){
      queryBuilder = queryBuilder.addSelect("lesson.id")
        .addGroupBy("lesson.id")
        .where("unit.id = :unitId", { unitId: filters.unitId})
    }
    if (filters.startTime && filters.endTime){
      queryBuilder = queryBuilder.where("answer.createdAt between :startTime and :endTime", {startTime: filters.startTime, endTime: filters.endTime})
    }

    queryBuilder = queryBuilderApply.apply(queryBuilder)

    const averagePerformance = queryBuilder.getRawMany();
    const userPerformance = queryBuilder.where("answer.userId = :userId", {userId}).getRawMany()

    return { averagePerformance, userPerformance };
  }

  async getTimeSpentGraph(subjectId: string, unitId: string, startTime: string, endTime: string, userId: string) {
    const filters = {
        subjectId, unitId, startTime, endTime,
    }
    return await this.getGraphData(filters, userId,  (queryBuilder) =>
       queryBuilder.addSelect('SUM(solutionDuration)', "timeSpent")
    );
  }
}
