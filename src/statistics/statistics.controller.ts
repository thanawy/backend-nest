import { Controller, Get, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { User } from '@auth/decorators/user.decorator';
import * as entity from '@users/entities/user.entity';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('time-spent-graph')
  async getTimeSpentGraph(
    @User() user: entity.User,
    @Query('filters') filters: any = null,
  ) {
    return await this.statisticsService.getTimeSpentGraph(filters, user.id);
  }
}
