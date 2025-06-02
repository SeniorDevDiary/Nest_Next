import { Module } from '@nestjs/common';
import { TodoController } from './modules/todo/todo.controller';
import { TodoService } from './modules/todo/todo.service';
import { TodoGateway } from './modules/todo/todo.gateway';

@Module({
  controllers: [TodoController],
  providers: [TodoService, TodoGateway],
})
export class AppModule {}
