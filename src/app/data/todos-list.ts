import { AvlTree, AvlTreeNode } from "@datastructures-js/binary-search-tree";
import { Stack } from "@datastructures-js/stack";

export const MIN_KEY = 1;

export interface Todo {
  title: string;
  completed: boolean;
}

export class TodosList extends AvlTree<number, Todo> implements Iterable<AvlTreeNode<number, Todo>> {
  [Symbol.iterator](): Iterator<AvlTreeNode<number, Todo>, any, undefined> {
    const stack = new Stack<AvlTreeNode<number, Todo>>();    

    let current = this.root();    
    
    return {
      next: () => {
        while(current !== null) {
          stack.push(current);

          current = current.getLeft() as AvlTreeNode<number, Todo> | null;
        }

        current = stack.pop();
        
        const value = current;

        current = current?.getRight() as AvlTreeNode<number, Todo> | null;

        return {
          done: value === null,
          value
        }
      }
    }
  }  
}