import { TestBed } from '@angular/core/testing';

import { MIN_KEY, TodosList } from '../../data/todos-list';

import { TODOS_STORAGE } from '../todos-storage';
import { TodosLocalStorageService } from './todos-local-storage.service';

describe('TodosLocalStorageService', () => {
  let service: TodosLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TODOS_STORAGE,
          useClass: TodosLocalStorageService
        }
      ]
    });
    
    service = TestBed.inject(TODOS_STORAGE);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be saved in localStorage', () => {
    const list = new TodosList();

    let current = MIN_KEY;

    list.insert(current, {
      completed: false,
      title: 'Task #1'
    });

    current++;

    list.insert(current, {
      completed: true,
      title: 'Task #2'
    });

    current++;

    list.insert(current, {
      completed: false,
      title: 'Task #3'
    });
    
    service.saveTodos(list);

    list.clear();    

    service.loadTodos(list);

    let item = list.min();

    current = MIN_KEY;

    expect(item?.getKey()).toEqual(current);
    expect(item?.getValue().completed).toBeFalse();
    expect(item?.getValue().title).toEqual('Task #1');

    current++;

    item = list.root();

    expect(item?.getKey()).toEqual(current);
    expect(item?.getValue().completed).toBeTrue();
    expect(item?.getValue().title).toEqual('Task #2');

    current++;

    item = list.max();

    expect(item?.getKey()).toEqual(current);
    expect(item?.getValue().completed).toBeFalse();
    expect(item?.getValue().title).toEqual('Task #3');
  });
});
