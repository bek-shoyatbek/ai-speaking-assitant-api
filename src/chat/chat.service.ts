import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AIService } from './ai.service';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private aiService: AIService,
  ) {}

  async startPracticeSession(userId: string, topicId: string) {
    return this.prisma.practiceSession.create({
      data: {
        userId,
        topicId,
        startTime: new Date(),
      },
    });
  }

  async saveUserResponse(sessionId: string, answer: string) {
    const session = await this.prisma.practiceSession.findUnique({
      where: { id: sessionId },
      include: { responses: true },
    });

    const questionNumber = session.responses.length + 1;

    return this.prisma.response.create({
      data: {
        practiceSessionId: sessionId,
        questionContent: `Question ${questionNumber}`, // You might want to store actual questions
        audioUrl: '', // Implement audio upload logic
        transcription: answer,
      },
    });
  }

  async getNextQuestion(sessionId: string) {
    const session = await this.prisma.practiceSession.findUnique({
      where: { id: sessionId },
      include: { responses: true, topic: true },
    });

    const questionCount = session.responses.length;
    if (questionCount >= 5) {
      // Assuming 5 questions per session
      return null;
    }

    return this.aiService.generateQuestion(
      session.topic.title,
      questionCount + 1,
    );
  }

  async generateFeedback(sessionId: string) {
    const session = await this.prisma.practiceSession.findUnique({
      where: { id: sessionId },
      include: { responses: true },
    });

    const feedback = await this.aiService.generateFeedback(
      session.responses.map((r) => r.transcription),
    );

    await this.prisma.practiceSession.update({
      where: { id: sessionId },
      data: {
        endTime: new Date(),
        feedback,
      },
    });

    return feedback;
  }
}
