import { Todo } from "./todo";
import type { List } from "./defs";
import { v4 as uuidv4 } from "uuid";

const listItemDiv: HTMLDivElement = document.querySelector(
  "[data-list-items]"
) as HTMLDivElement;
const addListItemInput: HTMLInputElement = document.querySelector(
  "[data-add-list-item-input]"
) as HTMLInputElement;
const addListItemButton: HTMLButtonElement = document.querySelector(
  "[data-add-list-item-button]"
) as HTMLButtonElement;

function createTodo(title?: string) {
  return new Todo(title);
}

function addListItem(todo: Todo) {
  // <div class="list-item">
  const listItem = document.createElement("div");
  listItem.classList.add("list-item");
  listItemDiv.appendChild(listItem);
  //             <div class="list-item-title">
  const listItemTitle = document.createElement("div");
  listItemTitle.classList.add("list-item-title");
  listItem.appendChild(listItemTitle);
  //               <input type="checkbox" id="task-1" data-list-item="1" />
  const hiddenCheckbox = document.createElement("input");
  hiddenCheckbox.type = "checkbox";
  hiddenCheckbox.id = todo.id;
  hiddenCheckbox.setAttribute("data-list-item", todo.id);
  listItemTitle.appendChild(hiddenCheckbox);
  //               <label class="list-item-label" for="task-1">
  const listItemLabel = document.createElement("label");
  listItemLabel.classList.add("list-item-label");
  listItemLabel.setAttribute("for", todo.id);
  listItemTitle.appendChild(listItemLabel);
  //                 <span class="custom-checkbox"></span>
  const customCheckbox = document.createElement("span");
  customCheckbox.classList.add("custom-checkbox");
  listItemLabel.appendChild(customCheckbox);
  //                 Record Video
  const todoTitleText = document.createTextNode(todo.title);
  listItemLabel.appendChild(todoTitleText);
  //               </label>
  //               <div tabindex="0" class="list-item-icon"> can add "expanded" classname
  const menuDropdownIcon = document.createElement("div");
  menuDropdownIcon.classList.add("list-item-icon", "expanded");
  menuDropdownIcon.setAttribute("tabindex", "0");
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
  menuDropdown.appendChild(todoDescription);
  //               </div>
  //               <div class="list-item-actions">
  const actionsContainer = document.createElement("div");
  actionsContainer.classList.add("list-item-actions");
  menuDropdown.appendChild(actionsContainer);
  //                 <div tabindex="0" class="list-item-flag flag-high-priority">
  const priorityFlag = document.createElement("div");
  priorityFlag.classList.add("list-item-flag");
  if (todo.priority === 0) {
    priorityFlag.classList.add("flag-low-priority");
  }
  if (todo.priority === 1) {
    priorityFlag.classList.add("flag-normal-priority");
  }
  if (todo.priority === 2) {
    priorityFlag.classList.add("flag-high-priority");
  }
  priorityFlag.setAttribute("tabindex", "0");
  actionsContainer.appendChild(priorityFlag);
  //                   <select>
  const prioritySelectDropdown = document.createElement("select");
  prioritySelectDropdown.name = todo.id + "-select";
  //                     <option value="0">Low</option>
  const lowOption = document.createElement("option");
  lowOption.value = "0";
  if (todo.priority === 0) {
    lowOption.selected = true;
  }
  //                     <option value="1">Normal</option>
  prioritySelectDropdown.add(lowOption);
  const normalOption = document.createElement("option");
  normalOption.value = "1";
  if (todo.priority === 1) {
    normalOption.selected = true;
  }
  //                     <option value="2">High</option>
  prioritySelectDropdown.add(normalOption);
  const highOption = document.createElement("option");
  highOption.value = "2";
  if (todo.priority === 2) {
    highOption.selected = true;
  }
  prioritySelectDropdown.add(highOption);
  //                   </select>
  //                 </div>
  //                 <button class="list-item-edit-button"></button>
  const editButton = document.createElement("button");
  editButton.classList.add("list-item-edit-button");
  actionsContainer.appendChild(editButton);
  //                 <button class="list-item-delete-button"></button>
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("list-item-delete-button");
  actionsContainer.appendChild(deleteButton);
  //               </div>
  //             </div>
  //           </div>
}

// Event Listeners
addListItemButton.addEventListener("click", (e) => {
  e.preventDefault();
  const title: string = addListItemInput.value;
  addListItemInput.value = "";
  const newTodo: Todo =
    title === "" ? createTodo(undefined) : createTodo(title);
  console.log(newTodo);
  addListItem(newTodo);
});

// window.onload = function() {
//     var div = document.getElementById('editable');
//     div.onclick = function(e) {
//         this.contentEditable = true;
//         this.focus();
//         this.style.backgroundColor = '#E0E0E0';
//         this.style.border = '1px dotted black';
//     }

//     div.onmouseout = function() {
//         this.style.backgroundColor = '#ffffff';
//         this.style.border = '';
//         this.contentEditable = false;
//     }
// }

// // And for HTML

// <div id="content">
//     <span id='editable'>Surprisingly,</span>
//     <a href="http://google.com">clicking this link does nothing at all.</a>
// </div>
