import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos() {
    return this.todoService.findAll();
  }

  @Post()
  createTodo(@Body('title') title: string) {
    return this.todoService.create(title);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    this.todoService.delete(Number(id));
  }

  @Post(':id/toggle')
  toggleTodo(@Param('id') id: string) {
    this.todoService.toggle(Number(id));
  }
}
