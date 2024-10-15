import { Module } from '@nestjs/common';
import { AudioService } from './audio.service';
import { AudioController } from './audio.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AudioController],
  providers: [AudioService, ConfigService],
})
export class AudioModule {}
