import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AudioService } from './audio.service';

@Controller('audio')
export class AudioController {
  constructor(private audioService: AudioService) {}

  @Get('stream')
  async streamAudio(@Query('text') text: string, @Res() res: Response) {
    const stream = await this.audioService.streamAudio(text);
    res.set({
      'Content-Type': 'audio/mpeg',
      'Transfer-Encoding': 'chunked',
    });
    stream.pipe(res);
  }
}
