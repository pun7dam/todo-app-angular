import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  item: string = '';
  filterBy: string = 'all';
  todoList: Todo[] = [];

  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.loadTodoList;
    console.log(this.loadTodoList());
  }

  loadTodoList(): void {
    this.todoList = this.todoService.getTodos();
    //console.log(this.todoList)
  }

  addTodo(): any {
    if (this.item.trim() == '') {
      this.snackBar.open('Title is required!', 'Close', {
        duration: 2000,
        verticalPosition: 'top', // 'top' | 'bottom'
      });      
      return false;
    }
    try {
      this.todoService.addTodo(this.item);
      this.item = '';
      this.loadTodoList();
    } catch (error) {
      this.snackBar.open('Failed to add Todo.', 'Close', {
        duration: 3000,
        verticalPosition: 'top', // 'top' | 'bottom'
      });     
    }
  }

  setFilter(filter: string): void {
    this.filterBy = filter;
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
    this.loadTodoList();
  }
  toggleComplete(id: number) {
    this.todoService.toggleCompletion(id);
  }
}
