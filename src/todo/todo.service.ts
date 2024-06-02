import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  private todos = [
    {
      id: 1,
      item: 'Item one',
    },
    {
      id: 2,
      item: 'Item two',
    },
  ];
  create(createTodoDto: CreateTodoDto) {
    const newTodo = {
      id: Math.floor(Math.random() * 10),
      item: createTodoDto.item,
    };

    this.todos.push(newTodo);

    return this.findOne(newTodo.id);
  }

  findAll() {
    return this.todos;
  }

  findOne(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    const todoIdx = this.todos.findIndex((todo) => todo.id === id);
    this.todos[todoIdx].item = updateTodoDto.item;

    return this.findOne(id);
  }

  remove(id: number) {
    const newTodos = this.todos.filter((todo) => todo.id !== id);
    return newTodos;
  }
}
