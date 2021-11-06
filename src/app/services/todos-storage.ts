import { InjectionToken } from "@angular/core";

import { TodosList } from "../data/todos-list";

export interface TodosStorage {
  saveTodos(todos: TodosList): void;
  loadTodos(todos: TodosList): void;
}

export const TODOS_STORAGE = new InjectionToken<TodosStorage>('TodosStorage');