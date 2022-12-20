import { Todo } from "./todo";
import type { Group, GroupItem, List } from "./defs";
import { v4 as uuidv4 } from "uuid";
import {
  addTodoToHTML,
  addListToGroupHTML,
  clearCompletedFromHTML,
  deleteListFromHTML,
  renderList,
  updateSelectedList,
} from "./DisplayController";

let listGroup: Group = [];

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

recallLocal();

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

export function storeListLocal() {
  let data: string[] = [];
  listGroup.forEach((groupItem) => {
    const newObject = {
      id: groupItem.id,
      name: groupItem.name,
      list: Array.from(groupItem.list.entries()),
    };
    data.push(JSON.stringify(newObject));
  });
  window.localStorage.setItem("Atomic_Todo", JSON.stringify(data));
}
function recallLocal() {
  const result = window.localStorage.getItem("Atomic_Todo");
  if (typeof result === "string") {
    listGroup = [];
    const parsedJSON = JSON.parse(result);
    // The result should be an array of strings
    parsedJSON.forEach((stringifiedObject: string) => {
      let parsedObject = JSON.parse(stringifiedObject);
      // console.log(parsedObject);
      const groupItem: GroupItem = {
        id: parsedObject.id,
        name: parsedObject.name,
        list: new Map(parsedObject.list),
      };
      listGroup.push(groupItem);
      const tempGroupItem = addListToGroupHTML(groupItem);
      tempGroupItem.addEventListener("click", () => {
        updateSelectedList(groupItem);
        currentList = groupItem.list;
      });
      listGroupContainerDiv.appendChild(tempGroupItem);
    });
    currentList = listGroup[0].list;
    updateSelectedList(listGroup[0]);
    renderList(listGroup[0]);
  } else {
    listGroup = [];
  }
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
  storeListLocal();
});

deleteListButton.addEventListener("click", (e) => {
  let result: boolean = confirm("Are you sure?\nThis action cannot be undone.");
  //delete the item from HTML and the Group of lists
  if (result) {
    const listID = deleteListButton.dataset.deleteList;
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
    storeListLocal();
  }

  // If that was the last group, create a new default list
  if (listGroup.length === 0) {
    createList();
  } else {
    const defaultList = listGroup[0];
    renderList(defaultList);
    deleteListButton.setAttribute("data-delete-list", defaultList.id);
  }
  storeListLocal();
});

addListItemButton.addEventListener("click", (e) => {
  e.preventDefault();
  const title: string = addListItemInput.value;
  addListItemInput.value = "";
  const newTodo: Todo = title === "" ? new Todo() : new Todo(title);
  addTodoToHTML(newTodo, currentList);
  currentList.set(newTodo.id, newTodo);
  storeListLocal();
});

clearCompletedButton.addEventListener("click", () => {
  currentList.forEach((todo) => {
    clearCompletedFromHTML(todo);
    currentList.delete(todo.id);
  });
  storeListLocal();
});

// Sample Data
if (listGroup.length === 0) {
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
  storeListLocal();
}
