import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@database/database.module';
import { UsersModule } from '@users/users.module';
import { ProgramsModule } from '@programs/programs.module';
import { SubjectsModule } from '@subjects/subjects.module';
import { UnitsModule } from '@units/units.module';
import { AnswersModule } from '@answers/answers.module';
import { SubscriptionsModule } from '@subscriptions/subscriptions.module';
import { PlansModule } from '@plans/plans.module';
import { QuestionsModule } from '@questions/questions.module';
import { TagsModule } from '@tags/tags.module';
import { CollectionsModule } from '@collections/collections.module';
import { AuthModule } from '@auth/auth.module';
import { CurrentUserGuard } from '@auth/guards/current.user.guard';
import { RolesGuard } from '@auth/rbac/roles.guard';
import { RolesService } from '@auth/rbac/roles/roles.service';
import { LessonsModule } from '@lessons/lessons.module';
import { ClassesModule } from '@classes/classes.module';
import { OnboardingScreenModule } from '@onboarding-screen/onboarding-screen.module';
import { OrdersModule } from '@orders/orders.module';
import { PaymobModule } from '@payments/paymob/paymob.module';
import { EmailModule } from '@mailer/mailer.module';
import { StatisticsController } from './statistics/statistics.controller';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EmailModule,
    DatabaseModule,
    UsersModule,
    ProgramsModule,
    SubjectsModule,
    UnitsModule,
    AnswersModule,
    SubscriptionsModule,
    PlansModule,
    QuestionsModule,
    TagsModule,
    CollectionsModule,
    AuthModule,
    OnboardingScreenModule,
    LessonsModule,
    ClassesModule,
    OrdersModule,
    PaymobModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RolesService,
    {
      provide: 'APP_GUARD',
      useClass: CurrentUserGuard,
    },
    RolesGuard,
  ],
})
export class AppModule {}
