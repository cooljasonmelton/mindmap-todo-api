import { ToDoItem } from "../types";

// TODO: replace with db
let todos: ToDoItem[] = [];
let nextId = 1;

export class TodoModel {
  static getAll(): ToDoItem[] {
    return todos;
  }

  static getById(id: string): ToDoItem | undefined {
    return todos.find((todo) => todo.id === id);
  }

  static create(todoData: Omit<ToDoItem, "id">): ToDoItem {
    const newTodo: ToDoItem = {
      id: nextId.toString(),
      ...todoData,
    };
    todos.push(newTodo);
    nextId++;
    return newTodo;
  }

  static update(
    id: string,
    updates: Partial<Omit<ToDoItem, "id">>
  ): ToDoItem | null {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) return null;

    todos[index] = { ...todos[index], ...updates };
    return todos[index];
  }

  static delete(id: string): boolean {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) return false;

    todos.splice(index, 1);
    return true;
  }
}
