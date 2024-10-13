import { Test, TestingModule } from '@nestjs/testing';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { PrismaService } from '../prisma/prisma.service';

describe('LessonsController', () => {
  let controller: LessonsController;
  let service: LessonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonsController],
      providers: [LessonsService, PrismaService],
    }).compile();

    controller = module.get<LessonsController>(LessonsController);
    service = module.get<LessonsService>(LessonsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllLessons', () => {
    it('should call service findAll method', async () => {
      const findAllSpy = jest.spyOn(service, 'findAll');
      await controller.findAllLessons();
      expect(findAllSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOneLesson', () => {
    it('should call service findOne method', async () => {
      const findOneSpy = jest.spyOn(service, 'findOne');
      const mockLesson = await service.create({
        title: 'title',
        description: 'description',
        youtubeLink: 'https://www.youtube.com/watch?v=NBsr3u0z4Hs',
      });

      const lessonId = mockLesson.id;
      await controller.findOneLesson(lessonId);
      expect(findOneSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('createLesson', () => {
    it('should call service create method', async () => {
      const createSpy = jest.spyOn(service, 'create');
      const dto: CreateLessonDto = {
        title: 'title',
        description: 'description',
        youtubeLink: 'https://www.youtube.com/watch?v=NBsr3u0z4Hs',
      };
      await controller.createLesson(dto);
      expect(createSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateLesson', () => {
    it('should call service update method', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      const mockLesson = await service.create({
        title: 'title',
        description: 'description',
        youtubeLink: 'https://www.youtube.com/watch?v=NBsr3u0z4Hs',
      });

      const dto: Partial<CreateLessonDto> = {
        title: 'new title',
      };
      const lessonId = mockLesson.id;
      await controller.updateLesson(lessonId, dto);
      expect(updateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('removeLesson', () => {
    it('should call service remove method', async () => {
      const removeSpy = jest.spyOn(service, 'remove');
      const mockLesson = await service.create({
        title: 'title',
        description: 'description',
        youtubeLink: 'https://www.youtube.com/watch?v=NBsr3u0z4Hs',
      });
      const lessonId = mockLesson.id;
      await controller.removeLesson(lessonId);
      expect(removeSpy).toHaveBeenCalledTimes(1);
    });
  });
});
