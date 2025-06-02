import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TodoGateway {
  @WebSocketServer()
  server: Server;

  broadcastTodos(todos: any[]) {
    this.server.emit('todos', todos);
  }
}
