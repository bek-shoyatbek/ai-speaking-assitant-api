import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { LessonsModule } from './lessons/lessons.module';
import { PracticeModule } from './practice/practice.module';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { AudioModule } from './audio/audio.module';
import { PracticeQuestionsModule } from './practice-questions/practice-questions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    LessonsModule,
    PracticeModule,
    ChatModule,
    AuthModule,
    AudioModule,
    PracticeQuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
