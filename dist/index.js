import {Todo} from "./todo.js";
import {v4 as uuidv4} from "../_snowpack/pkg/uuid.js";
import {
  addTodoToHTML,
  addListToGroupHTML,
  clearCompletedFromHTML,
  deleteListFromHTML,
  renderList,
  updateSelectedList
} from "./DisplayController.js";
const listGroup = [];
let currentList = new Map();
const listGroupContainerDiv = document.querySelector("[data-list-group-container]");
const addListInput = document.querySelector("[data-add-list-input]");
const addNewListButton = document.querySelector("[data-add-list]");
const addListItemInput = document.querySelector("[data-add-list-item-input]");
const addListItemButton = document.querySelector("[data-add-list-item-button]");
const clearCompletedButton = document.querySelector("[data-clear-tasks]");
const deleteListButton = document.querySelector("[data-delete-list]");
function createList(listName = "New List") {
  const newList = {id: uuidv4(), name: listName, list: new Map()};
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
  let result = confirm("Are you sure?\nThis action cannot be undone.");
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
  const title = addListItemInput.value;
  addListItemInput.value = "";
  const newTodo = title === "" ? new Todo() : new Todo(title);
  addTodoToHTML(newTodo, currentList);
  currentList.set(newTodo.id, newTodo);
});
clearCompletedButton.addEventListener("click", () => {
  currentList.forEach((todo) => {
    clearCompletedFromHTML(todo);
    currentList.delete(todo.id);
  });
});
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
}
