import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ProgramsModule } from './programs/programs.module';
import { SubjectsModule } from './subjects/subjects.module';
import { ChaptersModule } from './chapters/chapters.module';
import { AnswersModule } from './answers/answers.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { PlansModule } from './plans/plans.module';
import { QuestionsModule } from './questions/questions.module';
import { TagsModule } from './tags/tags.module';
import { CollectionsModule } from './collections/collections.module';
import { AuthModule } from './auth/auth.module';
import { WinstonModule } from 'nest-winston';
import winston from 'winston';
import { CurrentUserGuard } from './auth/guards/current.user.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    ProgramsModule,
    SubjectsModule,
    ChaptersModule,
    AnswersModule,
    SubscriptionsModule,
    PlansModule,
    QuestionsModule,
    TagsModule,
    CollectionsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: CurrentUserGuard,
    },
  ],
})
export class AppModule {}
