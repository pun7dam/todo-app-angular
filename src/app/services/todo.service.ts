import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private TODOS_STORAGE = 'TODOS';
  private todoList: Todo[] = [];
  private nextId: number = 1;

  getTodos(): Todo[] {
    const localTodos = localStorage.getItem(this.TODOS_STORAGE);
    if (localTodos) {
      this.todoList = JSON.parse(localTodos);
    }
    return this.todoList;
  }

  addTodo(item: string): void {
    const newTodo: Todo = {
      id: this.nextId++,
      item,
      completed: false,
      createdAt: new Date(),
    };
    this.todoList.push(newTodo);
    this.saveTodos();
  }

  deleteTodo(id: number): void {
    this.todoList = this.todoList.filter((t) => t.id !== id);
    this.saveTodos();
  }
  toggleCompletion(id: number): void {
    const todo = this.todoList.find((t) => t.id === id);
    if (todo) {
      this.saveTodos();
    }
  }
  saveTodos(): void {
    localStorage.setItem(this.TODOS_STORAGE, JSON.stringify(this.todoList));
  }
}
