import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  async findAllLessons() {
    return this.lessonsService.findAll();
  }

  @Get(':id')
  async findOneLesson(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }

  @Post()
  async createLesson(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @Patch(':id')
  async updateLesson(
    @Param('id') id: string,
    @Body() updateLessonDto: Partial<CreateLessonDto>,
  ) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @Delete(':id')
  async removeLesson(@Param('id') id: string) {
    return this.lessonsService.remove(id);
  }
}
