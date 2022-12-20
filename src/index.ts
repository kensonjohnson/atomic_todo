import { Todo } from "./todo";
import type { Group, List } from "./defs";
import { v4 as uuidv4 } from "uuid";
import {
  addTodoToHTML,
  addListToGroupHTML,
  clearCompletedFromHTML,
  deleteListFromHTML,
  renderList,
  updateSelectedList,
} from "./DisplayController";

const listGroup: Group = [];

let currentList: List = new Map();

const listGroupContainerDiv: HTMLDivElement = document.querySelector(
  "[data-list-group-container]"
) as HTMLDivElement;
const addListInput: HTMLInputElement = document.querySelector(
  "[data-add-list-input]"
) as HTMLInputElement;
const addNewListButton: HTMLButtonElement = document.querySelector(
  "[data-add-list]"
) as HTMLButtonElement;
const addListItemInput: HTMLInputElement = document.querySelector(
  "[data-add-list-item-input]"
) as HTMLInputElement;
const addListItemButton: HTMLButtonElement = document.querySelector(
  "[data-add-list-item-button]"
) as HTMLButtonElement;
const clearCompletedButton: HTMLButtonElement = document.querySelector(
  "[data-clear-tasks]"
) as HTMLButtonElement;
const deleteListButton: HTMLButtonElement = document.querySelector(
  "[data-delete-list]"
) as HTMLButtonElement;

function createList(listName: string = "New List") {
  const newList = { id: uuidv4(), name: listName, list: new Map() as List };
  listGroup.push(newList);
  const newGroupItem = addListToGroupHTML(newList);
  newGroupItem.addEventListener("click", () => {
    updateSelectedList(newList);
    currentList = newList.list;
  });
  listGroupContainerDiv.appendChild(newGroupItem);
  deleteListButton.setAttribute("data-delete-list", newList.id);
  currentList = newList.list;
  renderList(newList);
}

// Event Listeners

addNewListButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (addListInput.value === "") {
    createList();
  } else {
    createList(addListInput.value);
    addListInput.value = "";
  }
});

deleteListButton.addEventListener("click", (e) => {
  let result: boolean = confirm("Are you sure?\nThis action cannot be undone.");
  //delete the item from HTML and the Group of lists
  if (result) {
    const listID = deleteListButton.dataset.deleteList;
    console.log(listID);
    deleteListFromHTML(listID);
    const indexToRemove = listGroup.findIndex((groupItem) => {
      if (groupItem.id === listID) {
        return true;
      }
      return false;
    });
    if (indexToRemove >= 0 && indexToRemove < listGroup.length) {
      listGroup.splice(indexToRemove, 1);
    }
  }

  // If that was the last group, create a new default list
  if (listGroup.length === 0) {
    createList();
  } else {
    const defaultList = listGroup[0];
    renderList(defaultList);
    deleteListButton.setAttribute("data-delete-list", defaultList.id);
  }
});

addListItemButton.addEventListener("click", (e) => {
  e.preventDefault();
  const title: string = addListItemInput.value;
  addListItemInput.value = "";
  const newTodo: Todo = title === "" ? new Todo() : new Todo(title);
  addTodoToHTML(newTodo, currentList);
  currentList.set(newTodo.id, newTodo);
});

clearCompletedButton.addEventListener("click", () => {
  currentList.forEach((todo) => {
    clearCompletedFromHTML(todo);
    currentList.delete(todo.id);
  });
});
console.log("outside");

// Sample Data
if (listGroup.length === 0) {
  console.log("inside");
  createList("Grocery List");
  const sampleTodo1 = new Todo("Eggs");
  currentList.set(sampleTodo1.id, sampleTodo1);
  const sampleTodo2 = new Todo("Sprite");
  sampleTodo2.completed = true;
  currentList.set(sampleTodo2.id, sampleTodo2);
  const sampleTodo3 = new Todo("Steak");
  sampleTodo3.open = true;
  currentList.set(sampleTodo3.id, sampleTodo3);
  renderList(listGroup[0]);
}
