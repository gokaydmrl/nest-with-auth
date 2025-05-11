import { SseService } from '../services/sse.service';
import { Injectable } from '@nestjs/common';
import { WebSocket } from 'ws';
import * as dotenv from 'dotenv';
import { Observable } from 'rxjs';
dotenv.config();
@Injectable()
export class OpenAiService {
  constructor(private readonly sseService: SseService) {}
  private url =
    'wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01';

  public getKey() {
    console.log(process.env.OPENAI_KEY);
  }

  private getWsClient(): WebSocket {
    const wsClient = new WebSocket(this.url, {
      headers: {
        Authorization: 'Bearer ' + process.env.OPENAI_KEY,
        'OpenAI-Beta': 'realtime=v1',
      },
    });
    return wsClient;
  }

  public getVoiceStream(username: string): Observable<MessageEvent> {
    const wsClient = this.getWsClient();
    wsClient.on('open', function open() {
      console.log('Connected to server open ai.');
      wsClient.send(
        JSON.stringify({
          type: 'response.create',
          response: {
            modalities: ['text', 'audio'],
            instructions: `Sen mindlee tarafından geliştirilen bir yapay zeka sohbet aracısın. Kullanıcılara ismiyle seslen. Kullanıcının ismi ${username}. Pozitif, olumlu ve iyimser bir bakış açısı ile konuş. Motive edici alıntılar yap, akıl hocası ol. Amacın duyguları anlamak, kullanıcıları cesaretlendirmek, nasıl hissettiklerini öğrenmek ve onlara mentorluk etmek. Kişilere düşündürücü sorular sor. Konuşmayı aktif tutmak için pratik tavsiyeler ve çözümler hazırla. Kişinin karşılaştığı zorlukları tanımlasına yardım et ve hayallerini gerçekleştirmesine yardımcı ol. Kitaplar, makaleler veya web sitelerinden yardımcı olabilecek kaynaklar ve araçlar sağla. Siz diye hitap etme, sen diye hitap et. Bana canım deme. Cevaplarını anlaşılır, kısa ve net bir şekilde ver. Mesajlar kısa olmak zorunda. Daha önce verdiğin cevapları tekrar verme. Her seferinde nasıl yardımcı olabilirim deme, farklı yanıtlar da ver. Yapabiliyorsan özetle.`,
            voice: 'alloy',
            output_audio_format: 'pcm16',
            tool_choice: 'auto',
            temperature: 0.7,
            max_output_tokens: 1000,
            input: [
              // potentially include existing conversation items:

              {
                type: 'message',
                role: 'user',
                content: [
                  {
                    type: 'input_text',
                    text: 'hello',
                  },
                  // {
                  //   type: 'input_audio',
                  //   audio: audio,
                  // },
                ],
              },
            ],
          },
        }),
      );
    });

    wsClient.on('message', (message: string) => {
      const messageData: string = Buffer.from(message, 'base64').toString(
        'utf-8',
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const parsedMessage: Record<string, any> = JSON.parse(messageData);
      this.sseService.send(parsedMessage);
    });

    return this.sseService.stream$;
  }
}
