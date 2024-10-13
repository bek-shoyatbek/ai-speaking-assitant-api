import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LessonsService {
  private readonly logger = new Logger(LessonsService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(lesson: CreateLessonDto) {
    try {
      const result = await this.prismaService.lesson.create({
        data: {
          ...lesson,
          thumbnailUrl: this.getThumbnailImage(lesson.youtubeLink),
        },
      });
      return result;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        'Internal server error',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async findAll() {
    try {
      return await this.prismaService.lesson.findMany();
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        'Internal server error',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async findOne(id: string) {
    try {
      const lesson = await this.prismaService.lesson.findUnique({
        where: { id },
      });
      if (!lesson) {
        throw new HttpException('Lesson not found', HttpStatus.NOT_FOUND);
      }
      return lesson;
    } catch (err) {
      this.logger.error(err);
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async update(id: string, updateLessonDto: Partial<CreateLessonDto>) {
    try {
      const updatedLesson = await this.prismaService.lesson.update({
        where: { id },
        data: {
          ...updateLessonDto,
          thumbnailUrl: updateLessonDto.youtubeLink
            ? this.getThumbnailImage(updateLessonDto.youtubeLink)
            : undefined,
        },
      });
      return updatedLesson;
    } catch (err) {
      this.logger.error(err);
      if (err.code === 'P2025') {
        throw new HttpException('Lesson not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async remove(id: string) {
    try {
      await this.prismaService.lesson.delete({
        where: { id },
      });
      return { message: 'Lesson deleted successfully' };
    } catch (err) {
      this.logger.error(err);
      if (err.code === 'P2025') {
        throw new HttpException('Lesson not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  private getThumbnailImage(link: string) {
    const imageURL = 'http://img.youtube.com/vi/VIDEOID/maxresdefault.jpg';
    const videoId = link.split('=')[1];
    return imageURL.replace('VIDEOID', videoId);
  }
}
