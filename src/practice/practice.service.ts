import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateTopicDto,
  UpdateTopicDto,
  CreatePracticeSessionDto,
  UpdatePracticeSessionDto,
} from './dto';

@Injectable()
export class PracticeService {
  constructor(private prisma: PrismaService) {}

  async createTopic(createTopicDto: CreateTopicDto) {
    return this.prisma.topic.create({
      data: createTopicDto,
    });
  }

  async getAllTopics() {
    return this.prisma.topic.findMany();
  }

  async getTopicById(id: string) {
    const topic = await this.prisma.topic.findUnique({
      where: { id },
      include: { questions: true },
    });
    if (!topic) throw new NotFoundException(`Topic with ID ${id} not found`);
    return topic;
  }

  async updateTopic(id: string, updateTopicDto: UpdateTopicDto) {
    return this.prisma.topic.update({
      where: { id },
      data: updateTopicDto,
    });
  }

  async deleteTopic(id: string) {
    return this.prisma.topic.delete({
      where: { id },
    });
  }

  async createPracticeSession(
    createPracticeSessionDto: CreatePracticeSessionDto,
  ) {
    return this.prisma.practiceSession.create({
      data: createPracticeSessionDto,
    });
  }

  async getAllPracticeSessions() {
    return this.prisma.practiceSession.findMany();
  }

  async getPracticeSessionById(id: string) {
    const session = await this.prisma.practiceSession.findUnique({
      where: { id },
      include: { responses: true },
    });
    if (!session)
      throw new NotFoundException(`Practice session with ID ${id} not found`);
    return session;
  }

  async updatePracticeSession(
    id: string,
    updatePracticeSessionDto: UpdatePracticeSessionDto,
  ) {
    return this.prisma.practiceSession.update({
      where: { id },
      data: updatePracticeSessionDto,
    });
  }

  async deletePracticeSession(id: string) {
    return this.prisma.practiceSession.delete({
      where: { id },
    });
  }
}
