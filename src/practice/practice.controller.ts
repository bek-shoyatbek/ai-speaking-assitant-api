import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PracticeService } from './practice.service';
import {
  CreateTopicDto,
  UpdateTopicDto,
  CreatePracticeSessionDto,
  UpdatePracticeSessionDto,
} from './dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('practice')
@UseGuards(JwtAuthGuard)
export class PracticeController {
  constructor(private readonly practiceService: PracticeService) {}

  @Post('topic')
  createTopic(@Body() createTopicDto: CreateTopicDto) {
    return this.practiceService.createTopic(createTopicDto);
  }

  @Get('topics')
  getAllTopics() {
    return this.practiceService.getAllTopics();
  }

  @Get('topic/:id')
  getTopicById(@Param('id') id: string) {
    return this.practiceService.getTopicById(id);
  }

  @Put('topic/:id')
  updateTopic(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    return this.practiceService.updateTopic(id, updateTopicDto);
  }

  @Delete('topic/:id')
  deleteTopic(@Param('id') id: string) {
    return this.practiceService.deleteTopic(id);
  }

  @Post('session')
  createPracticeSession(
    @Body() createPracticeSessionDto: CreatePracticeSessionDto,
  ) {
    return this.practiceService.createPracticeSession(createPracticeSessionDto);
  }

  @Get('sessions')
  getAllPracticeSessions() {
    return this.practiceService.getAllPracticeSessions();
  }

  @Get('session/:id')
  getPracticeSessionById(@Param('id') id: string) {
    return this.practiceService.getPracticeSessionById(id);
  }

  @Put('session/:id')
  updatePracticeSession(
    @Param('id') id: string,
    @Body() updatePracticeSessionDto: UpdatePracticeSessionDto,
  ) {
    return this.practiceService.updatePracticeSession(
      id,
      updatePracticeSessionDto,
    );
  }

  @Delete('session/:id')
  deletePracticeSession(@Param('id') id: string) {
    return this.practiceService.deletePracticeSession(id);
  }
}
