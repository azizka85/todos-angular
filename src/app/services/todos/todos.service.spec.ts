import { TestBed } from '@angular/core/testing';

import { Todo } from '../../data/todos-list';
import { TodosService } from './todos.service';
import { TodosLocalStorageService } from '../todos-local-storage/todos-local-storage.service';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ TodosService, TodosLocalStorageService ]
    });
    
    service = TestBed.inject(TodosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.todosList).toBeTruthy();    
    expect(service.activeList).toBeTruthy();
    expect(service.completedList).toBeTruthy();
  });

  it('should be update and save todos', () => {
    service.clear();
    
    const item1 = service.addTodo({
      completed: false,
      title: 'Task #1'
    });

    const item2 = service.addTodo({
      completed: true,
      title: 'Task #2'
    });

    service.save();
    service.clear();

    expect(service.todosList.count()).toEqual(0);
    expect(service.activeList.count()).toEqual(0);
    expect(service.completedList.count()).toEqual(0);

    service.load();

    expect(service.todosList.count()).toEqual(2);
    expect(service.activeList.count()).toEqual(1);
    expect(service.completedList.count()).toEqual(1);

    let item = service.todosList.min();

    expect(item?.getKey()).toEqual(item1.getKey());
    expect(item?.getValue().completed).toBeFalse();
    expect(item?.getValue().title).toEqual('Task #1');

    item = service.todosList.max();

    expect(item?.getKey()).toEqual(item2.getKey());
    expect(item?.getValue().completed).toBeTrue();
    expect(item?.getValue().title).toEqual('Task #2');

    item = service.activeList.root();

    expect(item?.getKey()).toEqual(item1.getKey());
    expect(item?.getValue().completed).toBeFalse();
    expect(item?.getValue().title).toEqual('Task #1');

    item = service.completedList.root();

    expect(item?.getKey()).toEqual(item2.getKey());
    expect(item?.getValue().completed).toBeTrue();
    expect(item?.getValue().title).toEqual('Task #2');

    item = service.activeList.root();

    service.toggleCompleted(item?.getKey() as number, item?.getValue() as Todo);

    expect(service.activeList.count()).toEqual(0);
    expect(service.completedList.count()).toEqual(2);

    item = service.completedList.min();

    expect(item?.getKey()).toEqual(item1.getKey());
    expect(item?.getValue().completed).toBeTrue();
    expect(item?.getValue().title).toEqual('Task #1');

    item = service.completedList.max();

    expect(item?.getKey()).toEqual(item2.getKey());
    expect(item?.getValue().completed).toBeTrue();
    expect(item?.getValue().title).toEqual('Task #2');

    service.removeCompletedTodos();

    expect(service.todosList.count()).toEqual(0);
    expect(service.activeList.count()).toEqual(0);
    expect(service.completedList.count()).toEqual(0);
  });
});
