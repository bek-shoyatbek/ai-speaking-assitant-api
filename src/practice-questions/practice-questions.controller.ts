import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { PracticeQuestionsService } from './practice-questions.service';
import { CreateQuestionDto } from './dto';

@Controller('practice-questions')
export class PracticeQuestionsController {
  constructor(
    private readonly practiceQuestionsService: PracticeQuestionsService,
  ) {}

  @Post('question')
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.practiceQuestionsService.createQuestion(createQuestionDto);
  }

  @Get('question/:id')
  async getQuestion(@Param('id') id: string) {
    return this.practiceQuestionsService.getQuestion(id);
  }

  @Get('questions')
  async getQuestions(@Query('category') category?: string) {
    return this.practiceQuestionsService.getQuestions(category);
  }

  @Put('question/:id')
  async updateQuestion(
    @Param('id') id: string,
    @Body() updateQuestionDto: Partial<CreateQuestionDto>,
  ) {
    return this.practiceQuestionsService.updateQuestion(id, updateQuestionDto);
  }

  @Delete('question/:id')
  async deleteQuestion(@Param('id') id: string) {
    return this.practiceQuestionsService.deleteQuestion(id);
  }
}
