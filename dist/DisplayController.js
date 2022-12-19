const listItemContainerDiv = document.querySelector("[data-list-items]");
const listTitle = document.querySelector("[data-list-title]");
const deleteListButton = document.querySelector("[data-delete-list]");
export function renderList(listObject) {
  listItemContainerDiv.innerHTML = "";
  const list = listObject.list;
  if (list.size > 0) {
    list.forEach((todo) => {
      addTodoToHTML(todo, list);
    });
  }
  listTitle.innerText = listObject.name;
}
export function addListToGroupHTML(listObject) {
  const allGroupItems = document.querySelectorAll(".group-item");
  allGroupItems.forEach((item) => {
    item.classList.remove("active-group-item");
  });
  const groupItem = document.createElement("div");
  groupItem.classList.add("group-item", "active-group-item");
  groupItem.setAttribute("tabindex", "0");
  groupItem.innerText = listObject.name;
  groupItem.id = listObject.id;
  deleteListButton.setAttribute("data-delete-list", groupItem.id);
  renderList(listObject);
  return groupItem;
}
export function updateSelectedList(listObject) {
  const allGroupItems = document.querySelectorAll(".group-item");
  allGroupItems.forEach((item) => {
    item.classList.remove("active-group-item");
    if (item.id === listObject.id) {
      item.classList.add("active-group-item");
    }
  });
  renderList(listObject);
  deleteListButton.setAttribute("data-delete-list", listObject.id);
}
export function addTodoToHTML(todo, todoList) {
  const listItem = document.createElement("div");
  listItem.classList.add("list-item");
  listItem.setAttribute("id", todo.id);
  listItemContainerDiv.appendChild(listItem);
  const listItemTitle = document.createElement("div");
  listItemTitle.classList.add("list-item-title");
  listItem.appendChild(listItemTitle);
  const hiddenCheckbox = document.createElement("input");
  hiddenCheckbox.type = "checkbox";
  hiddenCheckbox.checked = todo.completed;
  listItemTitle.appendChild(hiddenCheckbox);
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
  const listItemLabel = document.createElement("label");
  listItemLabel.classList.add("list-item-label", "clickable");
  if (todo.completed) {
    listItemLabel.classList.add("completed");
  }
  listItemLabel.onclick = () => {
    if (listItemLabel.className === "list-item-label clickable") {
      listItemLabel.contentEditable = "true";
      if (listItemLabel.innerText === "New Item") {
        listItemLabel.innerText = "";
      }
      listItemLabel.focus();
    }
    listItemLabel.onblur = () => {
      listItemLabel.contentEditable = "false";
      if (listItemLabel.innerText === "") {
        listItemLabel.innerText = "New Item";
      }
      todo.title = listItemLabel.innerText;
    };
  };
  listItemTitle.appendChild(listItemLabel);
  const todoTitleText = document.createTextNode(todo.title);
  listItemLabel.appendChild(todoTitleText);
  const menuDropdownIcon = document.createElement("div");
  menuDropdownIcon.classList.add("list-item-icon");
  if (todo.open) {
    menuDropdownIcon.classList.add("expanded");
  }
  menuDropdownIcon.setAttribute("tabindex", "0");
  menuDropdownIcon.addEventListener("click", (e) => {
    todo.open = !todo.open;
    if (todo.open) {
      menuDropdownIcon.classList.add("expanded");
      menuDropdown.classList.add("show");
      listItemLabel.classList.add("clickable");
    } else {
      menuDropdownIcon.classList.remove("expanded");
      menuDropdown.classList.remove("show");
      listItemLabel.classList.remove("clickable");
    }
    todoDescription.blur();
  });
  listItemTitle.appendChild(menuDropdownIcon);
  const menuDropdown = document.createElement("div");
  menuDropdown.classList.add("expanded-list-content");
  if (todo.open) {
    menuDropdown.classList.add("show");
  }
  listItem.appendChild(menuDropdown);
  const todoDescription = document.createElement("div");
  todoDescription.classList.add("list-item-description");
  todoDescription.innerHTML = todo.description;
  todoDescription.onclick = () => {
    todoDescription.contentEditable = "true";
    if (todoDescription.innerText === "Click to add description") {
      todoDescription.innerText = "";
    }
    todoDescription.focus();
  };
  todoDescription.onblur = () => {
    todoDescription.contentEditable = "false";
    if (todoDescription.innerText === "") {
      todoDescription.innerText = "Click to add description";
    }
    todo.description = todoDescription.innerText;
  };
  menuDropdown.appendChild(todoDescription);
  const actionsContainer = document.createElement("div");
  actionsContainer.classList.add("list-item-actions");
  menuDropdown.appendChild(actionsContainer);
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("list-item-delete-button");
  deleteButton.onclick = () => {
    todoList.delete(todo.id);
    listItemContainerDiv.removeChild(listItem);
  };
  actionsContainer.appendChild(deleteButton);
  const priorityFlag = document.createElement("div");
  priorityFlag.classList.add("list-item-flag");
  function updatePriorityFlag() {
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
  const prioritySelectDropdown = document.createElement("select");
  prioritySelectDropdown.name = todo.id + "-select";
  prioritySelectDropdown.onchange = () => {
    todo.priority = parseInt(prioritySelectDropdown.value);
    updatePriorityFlag();
  };
  const lowOption = document.createElement("option");
  lowOption.value = "0";
  if (todo.priority === 0) {
    lowOption.selected = true;
  }
  lowOption.innerText = "Low";
  prioritySelectDropdown.add(lowOption);
  const normalOption = document.createElement("option");
  normalOption.value = "1";
  if (todo.priority === 1) {
    normalOption.selected = true;
  }
  normalOption.innerText = "Normal";
  prioritySelectDropdown.add(normalOption);
  const highOption = document.createElement("option");
  highOption.value = "2";
  if (todo.priority === 2) {
    highOption.selected = true;
  }
  highOption.innerText = "High";
  prioritySelectDropdown.add(highOption);
  priorityFlag.appendChild(prioritySelectDropdown);
}
export function clearCompletedFromHTML(todo) {
  if (todo.completed) {
    const listItem = document.getElementById(todo.id);
    listItemContainerDiv.removeChild(listItem);
  }
}
export function deleteListFromHTML(listID) {
  listItemContainerDiv.innerHTML = "";
  if (listID) {
    document.getElementById(listID)?.remove();
  }
}
