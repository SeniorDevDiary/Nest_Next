import { Injectable, OnModuleInit } from '@nestjs/common';
import { TodoGateway } from './todo.gateway';

export class Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable()
export class TodoService implements OnModuleInit {
  private todos: Todo[] = [];
  private id = 1;
  constructor(private readonly gateway: TodoGateway) {}

  onModuleInit() {
    setInterval(() => {
      console.log('setInterval');
      this.todos.length && this.delete(this.todos[0].id);
    }, 4000);
  }
  private notify() {
    this.gateway.broadcastTodos(this.todos);
  }

  findAll(): Todo[] {
    return this.todos;
  }

  create(title: string): Todo {
    const todo = { id: this.id++, title, completed: false };
    this.todos.push(todo);
    this.notify();
    return todo;
  }

  delete(id: number) {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.notify();
  }

  toggle(id: number) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) todo.completed = !todo.completed;
    this.notify();
  }
}
