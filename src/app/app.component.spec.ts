import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

import { TODOS_STORAGE } from './services/todos-storage';
import { TodosLocalStorageService } from './services/todos-local-storage/todos-local-storage.service';
import { TodosService } from './services/todos/todos.service';

describe('AppComponent', () => {
  let service: TodosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        TodosService, 
        { provide: TODOS_STORAGE, useClass: TodosLocalStorageService }
      ]
    }).compileComponents();

    service = TestBed.inject(TodosService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render todos list', () => {
    service.clear();

    service.addTodo({
      completed: false,
      title: 'Task #1'
    });

    service.addTodo({
      completed: true,
      title: 'Task #2'
    });

    service.addTodo({
      completed: false,
      title: 'Task #3'
    });

    service.save();

    const fixture = TestBed.createComponent(AppComponent);
    
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;

    let todosList = compiled.querySelectorAll('[data-test-id="todo-item"]');
    
    expect(todosList.length).toEqual(3);
    
    expect(todosList[0].textContent).toContain('Task #1');
    expect(todosList[0].querySelector('input')!.checked).toBeFalse();
    expect(todosList[1].textContent).toContain('Task #2');
    expect(todosList[1].querySelector('input')!.checked).toBeTrue();
    expect(todosList[2].textContent).toContain('Task #3');
    expect(todosList[2].querySelector('input')!.checked).toBeFalse();

    const todoInput = compiled.querySelector('[data-test-id="todo-input"]') as HTMLElement;

    todoInput.querySelector('span')!.click();

    fixture.detectChanges();

    todosList = compiled.querySelectorAll('[data-test-id="todo-item"]');

    expect(todosList.length).toEqual(0);

    todoInput.querySelector('span')!.click();

    fixture.detectChanges();

    todosList = compiled.querySelectorAll('[data-test-id="todo-item"]');

    expect(todosList.length).toEqual(3);

    todoInput.querySelector('input')!.value = 'Task #4';
    todoInput.querySelector('input')!.dispatchEvent(new KeyboardEvent('keyup', {
      key: 'Enter'
    }));

    fixture.detectChanges();

    todosList = compiled.querySelectorAll('[data-test-id="todo-item"]');

    expect(todosList.length).toEqual(4);

    expect(todosList[3].textContent).toContain('Task #4');
    expect(todosList[3].querySelector('input')!.checked).toBeFalse();

    const todosCount = compiled.querySelector('[data-test-id="todos-count"]');

    expect(todosCount?.textContent).toContain(4);

    const activeTodos = compiled.querySelector('[data-test-id="active-todos"]') as HTMLElement;

    activeTodos.click();

    fixture.detectChanges();

    todosList = compiled.querySelectorAll('[data-test-id="todo-item"]');

    expect(todosList.length).toEqual(3);

    todosList[2].querySelector('input')!.checked = true;
    todosList[2].querySelector('input')!.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    todosList = compiled.querySelectorAll('[data-test-id="todo-item"]');

    expect(todosList.length).toEqual(2);

    const completedTodos = compiled.querySelector('[data-test-id="completed-todos"]') as HTMLElement;

    completedTodos.click();

    fixture.detectChanges();

    todosList = compiled.querySelectorAll('[data-test-id="todo-item"]');

    expect(todosList.length).toEqual(2);

    expect(todosList[0].textContent).toContain('Task #2');
    expect(todosList[0].querySelector('input')!.checked).toBeTrue();
    expect(todosList[1].textContent).toContain('Task #4');
    expect(todosList[1].querySelector('input')!.checked).toBeTrue();

    const clearCompleted = compiled.querySelector('[data-test-id="clear-completed"]') as HTMLElement;

    clearCompleted.click();

    fixture.detectChanges();

    todosList = compiled.querySelectorAll('[data-test-id="todo-item"]');

    expect(todosList.length).toEqual(0);

    activeTodos.click();

    fixture.detectChanges();

    todosList = compiled.querySelectorAll('[data-test-id="todo-item"]');

    expect(todosList.length).toEqual(2);
    expect(todosCount?.textContent).toContain(2);
  });
});
