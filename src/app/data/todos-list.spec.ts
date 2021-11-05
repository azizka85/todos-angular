import { TodosList } from "./todos-list";

describe('TodosList', () => {
  it('should be iterable', () => {
    const list = new TodosList();

    const items = [];

    items.push(list.insert(1, {
      completed: false,
      title: 'Task #1'
    }));

    items.push(list.insert(2, {
      completed: true,
      title: 'Task #2'
    }));

    items.push(list.insert(3, {
      completed: false,
      title: 'Task #3'
    }));

    expect(list.count()).toEqual(3);

    let current = 1;

    for(let item of list) {   
      expect(item.getKey()).toEqual(current);
      expect(item.getValue()).toEqual(items[current-1].getValue());

      current++;
    }

    expect(current).toEqual(4);

    list.remove(2);

    expect(list.count()).toEqual(2);

    current = 1;

    for(let item of list) {
      expect(item.getKey()).toEqual(current);
      expect(item.getValue()).toEqual(items[current-1].getValue());            

      current += 2;
    }

    expect(current).toEqual(5);
  
    list.remove(1);

    expect(list.count()).toEqual(1);

    current = 3;

    for(let item of list) {
      expect(item.getKey()).toEqual(current);
      expect(item.getValue()).toEqual(items[current-1].getValue());

      current++;
    }

    expect(current).toEqual(4);

    list.remove(3);

    expect(list.count()).toEqual(0);

    current = 1;

    for(let item of list) {
      current++;
    }

    expect(current).toEqual(1);
    expect(list.root()).toEqual(null);
  });

  it('should insert item before or after', () => {
    const list = new TodosList();

    const item2 = list.insert(2, {
      completed: false,
      title: 'Title #2'
    });

    expect(list.count()).toEqual(1);
    expect(list.root()).toEqual(item2);

    const item1 = list.insert(1, {
      completed: true,
      title: 'Title #1'
    });

    expect(list.count()).toEqual(2);
    expect(list.min()).toEqual(item1);
    expect(list.max()).toEqual(item2);

    const item3 = list.insert(3, {
      completed: true,
      title: 'Title #3'
    });

    expect(list.count()).toEqual(3);
    expect(list.min()).toEqual(item1);
    expect(list.root()).toEqual(item2);
    expect(list.max()).toEqual(item3);
  });
});