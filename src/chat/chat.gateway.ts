import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomId: string) {
    client.join(roomId);
    console.log(`Client ${client.id} joined room ${roomId}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, roomId: string) {
    client.leave(roomId);
    console.log(`Client ${client.id} left room ${roomId}`);
  }

  @SubscribeMessage('startPractice')
  async handleStartPractice(
    client: Socket,
    data: { userId: string; topicId: string },
  ) {
    const { userId, topicId } = data;
    const session = await this.chatService.startPracticeSession(
      userId,
      topicId,
    );
    client.join(session.id);
    this.server
      .to(session.id)
      .emit('practiceStarted', { sessionId: session.id });
    await this.sendNextQuestion(session.id);
  }

  @SubscribeMessage('submitAnswer')
  async handleSubmitAnswer(
    client: Socket,
    data: { sessionId: string; answer: string },
  ) {
    const { sessionId, answer } = data;
    await this.chatService.saveUserResponse(sessionId, answer);
    await this.sendNextQuestion(sessionId);
  }

  private async sendNextQuestion(sessionId: string) {
    const question = await this.chatService.getNextQuestion(sessionId);
    if (question) {
      this.server.to(sessionId).emit('newQuestion', { question });
    } else {
      const feedback = await this.chatService.generateFeedback(sessionId);
      this.server.to(sessionId).emit('practiceComplete', { feedback });
    }
  }
}
