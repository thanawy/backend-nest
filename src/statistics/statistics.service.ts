import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Between } from 'typeorm';
import { Answer } from '@answers/entities/answer.entity';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async getGraphData(filters, userId, graphQuery) {
    graphQuery.relations = {
      question: { lesson: { unit: { subject: true } } },
    };

    if (filters.subjectId) {
      graphQuery['select'] = [...graphQuery.select, 'question.lesson.unit.id'];
      graphQuery['groupBy'] = [...graphQuery.select, 'question.lesson.unit.id'];
      graphQuery['where'] = {
        ...graphQuery.where,
        question: { lesson: { subject: { id: filters.subjectId } } },
      };
    }
    if (filters.unitId) {
      graphQuery['select'] = [...graphQuery.select, 'question.lesson.id'];
      graphQuery['groupBy'] = [...graphQuery.select, 'question.lesson.id'];
      graphQuery['where'] = {
        ...graphQuery.where,
        question: { lesson: { unit: { id: filters.unitId } } },
      };
    }
    if (filters.startTime && filters.endTime) {
      graphQuery['where'] = {
        ...graphQuery,
        createdAt: Between(filters.startTime, filters.endTime),
      };
    }
    const averagePerformanceQuery = graphQuery;
    const userPerformanceQuery = {
      ...graphQuery,
      where: { user: { id: userId } },
    };

    const averagePerformance = await this.answerRepository.find(
      averagePerformanceQuery,
    );
    const userPerformance =
      await this.answerRepository.find(userPerformanceQuery);

    return { averagePerformance, userPerformance };
  }

  async getTimeSpentGraph(filters, userId) {
    return await this.getGraphData(filters, userId, {
      select: ['SUM(solution_duration) as timeSpent'],
    });
  }
}
