export default class Todos {
  constructor() {
    this.todos = [];
  }

  get allTodos() {
    return this.todos;
  }

  getTodos(parentList) {
    let listOfTodos = [];

    this.todos.forEach((todo) => {
      if (todo.parentList === parentList) {
        listOfTodos.push(todo);
      }
    });
    return listOfTodos;
  }
}
