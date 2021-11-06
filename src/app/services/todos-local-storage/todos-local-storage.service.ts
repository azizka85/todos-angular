import { Injectable } from '@angular/core';

import { Todo, TodosList, MIN_KEY } from '../../data/todos-list';

@Injectable({
  providedIn: 'root'
})
export class TodosLocalStorageService {
  saveTodos(list: TodosList) {
    const todos: Todo[] = [];

    for(let item of list) {
      todos.push(item.getValue());
    }

    localStorage.setItem('data', JSON.stringify(todos));
  }

  loadTodos(list: TodosList): void {
    try {
      let todos = JSON.parse(localStorage.getItem('data') || '[]') || [];
      
      let current = MIN_KEY;

      for(let todo of todos) {
        list.insert(current, todo);

        current++;
      }
    } catch { }
  }
}
