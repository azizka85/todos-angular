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

    const todosList = compiled.querySelectorAll('[data-test-id="todo-item"]');
    
    expect(todosList.length).toEqual(3);
    
    expect(todosList[0].textContent).toContain('Task #1');
    expect(todosList[1].textContent).toContain('Task #2');
    expect(todosList[2].textContent).toContain('Task #3');
  });
});
