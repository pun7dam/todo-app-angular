import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  isVisible: boolean = false;
  editItem: string = '';
  editTodo!: Todo;
  @Input() todoList: Todo[] = [];
  @Input() filterBy: string = '';
  @Output()
  toggleEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  deleteEmitter: EventEmitter<number> = new EventEmitter<number>();

  onDelete(id: number) {
    this.deleteEmitter.emit(id);
  }
  onToggle(todo: Todo) {
    this.toggleEmitter.emit(todo.id);
  }
  get filteredTodos(): Todo[] {
    if (this.filterBy === 'completed') {
      return this.todoList.filter((todo) => todo.completed);
    } else if (this.filterBy === 'active') {
      return this.todoList.filter((todo) => !todo.completed);
    }
    return this.todoList;
  }
  onEdit(todo: Todo) {
    this.isVisible = true;
    this.editItem = todo.item;

    this.editTodo = todo;
  }
  closePopup() {
    this.isVisible = false;
  }
  updateOnEdit() {
    if (this.editItem.trim() == '') {
      return false;
    } else {
      return this.todoList.filter((todo) => {
        if (todo.id == this.editTodo.id) {
          todo.item = this.editItem;
        }
        this.isVisible = false;
      });
    }
  }
}
