import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { User } from '@auth/decorators/user.decorator';
import * as entity from '@users/entities/user.entity';
import { AuthenticatedGuard } from '@auth/guards/authenticated.guard';


@UseGuards(AuthenticatedGuard)
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}


  @Get('time-spent-graph')
  async getTimeSpentGraph(
    @User() user: entity.User,
    @Query('subject_id') subjectId: string = null,
    @Query('unit_id') unitId: string = null,
    @Query('start_time') startTime: string = null,
    @Query('end_time') endTime: string = null
  ) {
    return await this.statisticsService.getTimeSpentGraph(subjectId, unitId, startTime, endTime, user.id);
  }
}
