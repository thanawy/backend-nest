import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RolesGuard } from '@auth/rbac/roles.guard';
import { Roles } from '@auth/rbac/decorators/roles.decorator';
import { Permission } from '@auth/rbac/entities/permission.entity';

@Controller()
@UseGuards(RolesGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/hello")
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/")
  getHome(): string {
    return this.appService.getHello();
  }
}
