import { Injectable } from '@angular/core';

import { Todo, TodosList, MIN_KEY } from '../../data/todos-list';

import { TodosLocalStorageService } from '../todos-local-storage/todos-local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  protected todos: TodosList = new TodosList();
  protected active: TodosList = new TodosList();
  protected completed: TodosList = new TodosList();

  constructor(protected storage: TodosLocalStorageService) { }

  get todosList() {
    return this.todos;
  }

  get activeList() {
    return this.active;
  }

  get completedList() {
    return this.completed;
  }

  addTodo(todo: Todo) {
    const current = this.todos.max()?.getKey() || MIN_KEY - 1;

    if(todo.completed) {
      this.completed.insert(current + 1, todo);
    } else {
      this.active.insert(current + 1, todo);
    }

    return this.todos.insert(current + 1, todo);
  }

  toggleCompleted(key: number, todo: Todo) {
    todo.completed = !todo.completed;

    if(todo.completed) {
      this.active.remove(key);
      this.completed.insert(key, todo);
    } else {
      this.completed.remove(key);
      this.active.insert(key, todo);
    }
  }

  removeCompletedTodos() {
    for(let item of this.completed) {
      this.todos.remove(item.getKey());
    }

    this.completed.clear();
  }

  save() {
    this.storage.saveTodos(this.todos);
  }

  load() {
    this.clear();

    this.storage.loadTodos(this.todos);

    this.processList();
  }

  clear() {
    this.todos.clear();
    this.completed.clear();
    this.active.clear();
  }

  protected processList() {
    for(let item of this.todos) {
      if(item.getValue().completed) {
        this.completed.insert(item.getKey(), item.getValue());
      } else {
        this.active.insert(item.getKey(), item.getValue());
      }
    }
  }
}
