class App {
  constructor(form, formInput, formBtn, todosUl) {
    const todosFromStorage = localStorage.getItem("todos");
    const defaultTodos = [
      { title: "buy a banana", id: "1", done: false },
      { title: "buy milk", id: "2", done: false },
      { title: "buy watermelon", id: "3", done: true },
    ];
    this.todos = todosFromStorage ? JSON.parse(todosFromStorage) : defaultTodos;
    this.form = form;
    this.formInput = formInput;
    this.formBtn = formBtn;
    this.todosUl = todosUl;
    this._setEvents();
    this.saveTodos();
  }

  _setEvents() {
    this.form.addEventListener("submit", () => {
      event.preventDefault();
      const todo = new Todo(this.formInput.value, String(Date.now()));
      this.todos.push(todo);
      this.saveTodos();
      this.displayTodos();
    });
  }
  saveTodos() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
  displayTodos() {
    this.todosUl.innerHTML = "";
    for (const todo of this.todos) {
      this.todosUl.innerHTML += `
      <li class="todo ${todo.done ? "done" : ""}" data-id=${todo.id}>
      <input class="todo-cb" type="checkbox" ${todo.done ? "checked" : ""} />
      <input class="todo-title" value="${todo.title}" type="text" disabled />
      <i class="todo-icon edit far fa-edit"></i>
      <i class="todo-icon remove far fa-trash-alt"></i>
    </li>
      `;
      const checkbox = document.querySelector(`li[data-id="${todo.id}"] .todo-cb`);
      checkbox.addEventListener("change", () => {
        console.log("changed");
        this.todos.find((obj) => obj.id === todo.id).done = checkbox.checked;
        this.saveTodos();
        this.displayTodos();
      });
    }
  }
}

const todo = new App(
  document.querySelector(".form"),
  document.querySelector(".form-input"),
  document.querySelector(".form-btn"),
  document.querySelector(".todos")
);
todo.displayTodos();
