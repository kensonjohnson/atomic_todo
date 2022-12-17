import { Todo } from "./todo";
import type { List } from "./defs";
// import { v4 as uuidv4 } from "uuid";

const todoList: List = new Map();

const listItemContainerDiv: HTMLDivElement = document.querySelector(
  "[data-list-items]"
) as HTMLDivElement;
const addListItemInput: HTMLInputElement = document.querySelector(
  "[data-add-list-item-input]"
) as HTMLInputElement;
const addListItemButton: HTMLButtonElement = document.querySelector(
  "[data-add-list-item-button]"
) as HTMLButtonElement;

const clearCompletedButton: HTMLButtonElement = document.querySelector(
  "[data-clear-tasks]"
) as HTMLButtonElement;

function createTodo(title?: string) {
  return new Todo(title);
}

function addListItem(todo: Todo) {
  // <div class="list-item">
  const listItem = document.createElement("div");
  listItem.classList.add("list-item");
  listItem.setAttribute("id", todo.id);
  listItemContainerDiv.appendChild(listItem);

  //             <div class="list-item-title">
  const listItemTitle = document.createElement("div");
  listItemTitle.classList.add("list-item-title");
  listItem.appendChild(listItemTitle);

  //               <input type="checkbox" id="task-1" data-list-item="1" />
  const hiddenCheckbox = document.createElement("input");
  hiddenCheckbox.type = "checkbox";
  // hiddenCheckbox.id = todo.id;
  listItemTitle.appendChild(hiddenCheckbox);

  //                 <span class="custom-checkbox"></span>
  const customCheckbox = document.createElement("span");
  customCheckbox.classList.add("custom-checkbox");
  customCheckbox.addEventListener("click", () => {
    hiddenCheckbox.checked = !hiddenCheckbox.checked;
    listItemLabel.classList.toggle("completed");
    if (hiddenCheckbox.checked) {
      todo.completed = true;
    } else {
      todo.completed = false;
    }
  });
  listItemTitle.appendChild(customCheckbox);

  //               <label class="list-item-label" for="task-1">
  const listItemLabel = document.createElement("label");
  listItemLabel.classList.add("list-item-label", "clickable");
  listItemLabel.onclick = () => {
    console.log(listItemLabel.className === "list-item-label");
    if (listItemLabel.className === "list-item-label clickable") {
      listItemLabel.contentEditable = "true";
      listItemLabel.focus();
    }
    listItemLabel.onblur = () => {
      listItemLabel.contentEditable = "false";
      todo.title = listItemLabel.innerText;
      console.log(todo.title);
    };
  };
  listItemTitle.appendChild(listItemLabel);

  //                 Task Title
  const todoTitleText = document.createTextNode(todo.title);
  listItemLabel.appendChild(todoTitleText);
  //               </label>

  //               <div tabindex="0" class="list-item-icon"> can add "expanded" classname
  const menuDropdownIcon = document.createElement("div");
  menuDropdownIcon.classList.add("list-item-icon", "expanded");
  menuDropdownIcon.setAttribute("tabindex", "0");
  menuDropdownIcon.addEventListener("click", (e) => {
    menuDropdownIcon.classList.toggle("expanded");
    menuDropdown.classList.toggle("show");
    listItemLabel.classList.toggle("clickable");
    todoDescription.blur();
  });
  listItemTitle.appendChild(menuDropdownIcon);
  //               </div>
  //             </div>

  //             <div class="expanded-list-content"> can add "show" classname
  const menuDropdown = document.createElement("div");
  menuDropdown.classList.add("expanded-list-content", "show");
  listItem.appendChild(menuDropdown);

  //               <div class="list-item-description">
  const todoDescription = document.createElement("div");

  //                 Description of the list item
  todoDescription.classList.add("list-item-description");
  todoDescription.innerHTML = todo.description;
  todoDescription.onclick = () => {
    todoDescription.contentEditable = "true";
    todoDescription.focus();
  };
  todoDescription.onblur = () => {
    todoDescription.contentEditable = "false";
    todo.description = todoDescription.innerText;
  };
  menuDropdown.appendChild(todoDescription);
  //               </div>

  //               <div class="list-item-actions">
  const actionsContainer = document.createElement("div");
  actionsContainer.classList.add("list-item-actions");
  menuDropdown.appendChild(actionsContainer);

  //                 <button class="list-item-delete-button">
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("list-item-delete-button");
  deleteButton.onclick = () => {
    todoList.delete(todo.id);
    console.log(todoList.size);
    listItemContainerDiv.removeChild(listItem);
  };
  actionsContainer.appendChild(deleteButton);
  //                 </button>

  //                 <div tabindex="0" class="list-item-flag flag-high-priority">
  const priorityFlag = document.createElement("div");
  priorityFlag.classList.add("list-item-flag");

  function updatePriorityFlag(): void {
    priorityFlag.classList.value = "list-item-flag";
    if (todo.priority === 0) {
      priorityFlag.classList.add("flag-low-priority");
    }
    if (todo.priority === 1) {
      priorityFlag.classList.add("flag-normal-priority");
    }
    if (todo.priority === 2) {
      priorityFlag.classList.add("flag-high-priority");
    }
  }
  updatePriorityFlag();
  priorityFlag.setAttribute("tabindex", "0");
  actionsContainer.appendChild(priorityFlag);

  //                   <select>
  const prioritySelectDropdown = document.createElement("select");
  prioritySelectDropdown.name = todo.id + "-select";
  prioritySelectDropdown.onchange = () => {
    todo.priority = parseInt(prioritySelectDropdown.value);
    updatePriorityFlag();
  };
  //                     <option value="0">Low</option>
  const lowOption = document.createElement("option");
  lowOption.value = "0";
  if (todo.priority === 0) {
    lowOption.selected = true;
  }
  lowOption.innerText = "Low";
  prioritySelectDropdown.add(lowOption);

  //                     <option value="1">Normal</option>
  const normalOption = document.createElement("option");
  normalOption.value = "1";
  if (todo.priority === 1) {
    normalOption.selected = true;
  }
  normalOption.innerText = "Normal";
  prioritySelectDropdown.add(normalOption);

  //                     <option value="2">High</option>
  const highOption = document.createElement("option");
  highOption.value = "2";
  if (todo.priority === 2) {
    highOption.selected = true;
  }
  highOption.innerText = "High";
  prioritySelectDropdown.add(highOption);
  priorityFlag.appendChild(prioritySelectDropdown);
  //                   </select>
  //                 </div>

  //               </div>
  //             </div>
  //           </div>
}

// Event Listeners
addListItemButton.addEventListener("click", (e) => {
  e.preventDefault();
  const title: string = addListItemInput.value;
  addListItemInput.value = "";
  const newTodo: Todo = title === "" ? createTodo() : createTodo(title);
  addListItem(newTodo);
  todoList.set(newTodo.id, newTodo);
  console.log(todoList.size);
});

clearCompletedButton.addEventListener("click", () => {
  todoList.forEach((todo) => {
    if (todo.completed) {
      const listItem: HTMLDivElement = document.getElementById(
        todo.id
      ) as HTMLDivElement;
      listItemContainerDiv.removeChild(listItem);
      todoList.delete(todo.id);
    }
  });
});
