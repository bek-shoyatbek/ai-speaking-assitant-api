import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto';

@Injectable()
export class PracticeQuestionsService {
  constructor(private prisma: PrismaService) {}

  async createQuestion(createQuestionDto: CreateQuestionDto) {
    return this.prisma.question.create({
      data: this.createQuestion(createQuestionDto),
    });
  }

  async getQuestion(id: string) {
    const question = await this.prisma.question.findUnique({
      where: { id },
    });
    if (!question)
      throw new NotFoundException(`Question with ID ${id} not found`);
    return question;
  }

  async getQuestions(category?: string) {
    return this.prisma.question.findMany({
      where: category ? { category: category as any } : undefined,
    });
  }

  async updateQuestion(
    id: string,
    updateQuestionDto: Partial<CreateQuestionDto>,
  ) {
    return this.prisma.question.update({
      where: { id },
      data: updateQuestionDto as any,
    });
  }

  async deleteQuestion(id: string) {
    return this.prisma.question.delete({
      where: { id },
    });
  }
}
