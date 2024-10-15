import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as PlayHT from 'playht';

@Injectable()
export class AudioService {
  constructor(private readonly configService: ConfigService) {
    PlayHT.init({
      userId: configService.get('PLAYHT_USER_ID'),
      apiKey: configService.get('PLAYHT_API_KEY'),
    });
  }

  async streamAudio(text: string) {
    return PlayHT.stream(text, {
      voiceEngine: 'Play3.0-mini',
      speed: 1,
    });
  }
}
