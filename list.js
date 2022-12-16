import { v4 as uuidv4 } from "uuid";

export default class List {
  constructor() {
    this.id = uuidv4();
    this.todos = new Map();
  }

  get allTodos() {
    let listOfTodos = [];

    this.todos.forEach((todo) => {
      listOfTodos.push(todo);
    });
    return listOfTodos;
  }

  getTodo(id) {
    if (!id || typeof id !== "string") {
      throw TypeError("'id' must be defined and be of type: String");
    }

    if (this.todos.has(id)) {
      return this.todos.get(id);
    }

    return null;
  }

  addTodo(todo) {
    if (!todo) {
      return null;
    }
    let id = uuidv4();
    this.todos.set(id, todo);
    return id;
  }
}
