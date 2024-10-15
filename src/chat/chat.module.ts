import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AIService } from './ai.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  providers: [ChatGateway, ChatService, AIService, PrismaService],
})
export class ChatModule {}
