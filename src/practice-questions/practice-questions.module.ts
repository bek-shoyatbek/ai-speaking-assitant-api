import { Module } from '@nestjs/common';
import { PracticeQuestionsController } from './practice-questions.controller';
import { PracticeQuestionsService } from './practice-questions.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PracticeQuestionsController],
  providers: [PracticeQuestionsService, PrismaService],
})
export class PracticeQuestionsModule {}
