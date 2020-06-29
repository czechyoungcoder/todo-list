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
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const todo = new Todo(this.formInput.value, String(Date.now()));
      this.todos.push(todo);
      this.saveTodos();
      this.displayTodos();
      this.formInput.value = "";
    });
  }
  handleCheckboxes(checkboxes) {
    checkboxes.forEach((cb) => {
      cb.addEventListener("change", () => {
        const todoId = cb.parentNode.dataset.id;
        this.todos.find((t) => t.id === todoId).done = cb.checked;
        this.saveTodos();
        this.displayTodos();
      });
    });
  }
  handleRemoveButtons(removeButtons) {
    removeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const todoId = btn.parentNode.dataset.id;
        this.todos = this.todos.filter((t) => t.id !== todoId);
        this.saveTodos();
        this.displayTodos();
      });
    });
  }
  handleEditButtons(editButtons) {
    const saveChanges = (input, todoId) => {
      const newValue = input.value;
      this.todos.find((t) => t.id === todoId).title = newValue;
      this.saveTodos();
      this.displayTodos();
    };
    editButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const todo = btn.parentNode;
        const todoId = todo.dataset.id;
        const input = todo.querySelector(".todo-title");
        if (input.disabled) {
          input.disabled = false;
          input.focus();
          input.addEventListener("keydown", (e) => {
            if (e.keyCode === 13) {
              input.disabled = true;
              saveChanges(input, todoId);
            }
          });
        } else {
          input.disabled = true;
          saveChanges(input, todoId);
        }
      });
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
    }
    const checkboxes = document.querySelectorAll(".todo-cb");
    const removeButtons = document.querySelectorAll(".remove");
    const editButtons = document.querySelectorAll(".edit");
    this.handleCheckboxes(checkboxes);
    this.handleRemoveButtons(removeButtons);
    this.handleEditButtons(editButtons);
  }
}

const todo = new App(
  document.querySelector(".form"),
  document.querySelector(".form-input"),
  document.querySelector(".form-btn"),
  document.querySelector(".todos")
);
todo.displayTodos();
