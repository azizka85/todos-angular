import { Component, Inject } from '@angular/core';

import { Todo, TodosList } from './data/todos-list';

import { TodosService } from './services/todos/todos.service';

export enum TodosListMode {
  All = 0,
  Active = 1,
  Completed = 2
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  todosListMode = TodosListMode;

  display = true;
  listMode!: TodosListMode;
  todosList!: TodosList;

  constructor(
    @Inject(TodosService) protected todosService: TodosService
  ) { 
    todosService.load();

    this.changeListMode(TodosListMode.All);  
  } 
  
  toggleDisplay() {
    this.display = !this.display;
  }

  keyboardEventHandler(evt: KeyboardEvent) {
    if(evt.key === 'Enter' && evt.target instanceof HTMLInputElement) {
      const target = evt.target;
      const title = target.value.trim();

      if(title !== '') {
        const item = this.todosService.addTodo({
          title,
          completed: false
        });

        target.value = '';

        this.todosService.save();
      }
    }
  }

  toggleCompleted(key: number, todo: Todo) {
    this.todosService.toggleCompleted(key, todo);
    this.todosService.save();
  }

  changeListMode(mode: TodosListMode) {
    switch(mode) {
      case TodosListMode.All:
        this.todosList = this.todosService.todosList;
        break;
      case TodosListMode.Active:
        this.todosList = this.todosService.activeList;
        break;
      case TodosListMode.Completed:
        this.todosList = this.todosService.completedList;
        break;
    }

    this.listMode = mode;
  }

  clearCompleted() {
    this.todosService.removeCompletedTodos();
    this.todosService.save();
  }
}
