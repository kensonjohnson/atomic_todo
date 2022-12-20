// build/_snowpack/pkg/date-fns/toDate.js
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function createCommonjsModule(fn, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire(path, base === void 0 || base === null ? module.path : base);
    }
  }, fn(module, module.exports), module.exports;
}
function commonjsRequire() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var requiredArgs_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = requiredArgs;
  function requiredArgs(required, args) {
    if (args.length < required) {
      throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
    }
  }
  module.exports = exports.default;
});
var toDate_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = toDate;
  var _index = _interopRequireDefault(requiredArgs_1);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof2(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof = function _typeof2(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof(obj);
  }
  function toDate(argument) {
    (0, _index.default)(1, arguments);
    var argStr = Object.prototype.toString.call(argument);
    if (argument instanceof Date || _typeof(argument) === "object" && argStr === "[object Date]") {
      return new Date(argument.getTime());
    } else if (typeof argument === "number" || argStr === "[object Number]") {
      return new Date(argument);
    } else {
      if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
        console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
        console.warn(new Error().stack);
      }
      return new Date(NaN);
    }
  }
  module.exports = exports.default;
});
var __pika_web_default_export_for_treeshaking__ = /* @__PURE__ */ getDefaultExportFromCjs(toDate_1);
var toDate_default = __pika_web_default_export_for_treeshaking__;

// build/_snowpack/pkg/uuid.js
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var native = {
  randomUUID
};
function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}

// build/dist/todo.js
var Todo = class {
  constructor(title = "New Item") {
    this._id = v4();
    this._dateCreated = new Date();
    this.description = "Click to add description";
    this.priority = 1;
    this.completed = false;
    this.open = false;
    this.title = title;
  }
  get dateCreated() {
    return toDate_default(this._dateCreated);
  }
  get id() {
    return this._id;
  }
};

// build/dist/DisplayController.js
var listItemContainerDiv = document.querySelector("[data-list-items]");
var listTitle = document.querySelector("[data-list-title]");
var deleteListButton = document.querySelector("[data-delete-list]");
function renderList(listObject) {
  listItemContainerDiv.innerHTML = "";
  const list = listObject.list;
  if (list.size > 0) {
    list.forEach((todo) => {
      addTodoToHTML(todo, list);
    });
  }
  listTitle.innerText = listObject.name;
}
function addListToGroupHTML(listObject) {
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
function updateSelectedList(listObject) {
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
function addTodoToHTML(todo, todoList) {
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
function clearCompletedFromHTML(todo) {
  if (todo.completed) {
    const listItem = document.getElementById(todo.id);
    listItemContainerDiv.removeChild(listItem);
  }
}
function deleteListFromHTML(listID) {
  listItemContainerDiv.innerHTML = "";
  if (listID) {
    document.getElementById(listID)?.remove();
  }
}

// build/dist/index.js
var listGroup = [];
var currentList = new Map();
var listGroupContainerDiv = document.querySelector("[data-list-group-container]");
var addListInput = document.querySelector("[data-add-list-input]");
var addNewListButton = document.querySelector("[data-add-list]");
var addListItemInput = document.querySelector("[data-add-list-item-input]");
var addListItemButton = document.querySelector("[data-add-list-item-button]");
var clearCompletedButton = document.querySelector("[data-clear-tasks]");
var deleteListButton2 = document.querySelector("[data-delete-list]");
function createList(listName = "New List") {
  const newList = {id: v4(), name: listName, list: new Map()};
  listGroup.push(newList);
  const newGroupItem = addListToGroupHTML(newList);
  newGroupItem.addEventListener("click", () => {
    updateSelectedList(newList);
    currentList = newList.list;
  });
  listGroupContainerDiv.appendChild(newGroupItem);
  deleteListButton2.setAttribute("data-delete-list", newList.id);
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
deleteListButton2.addEventListener("click", (e) => {
  let result = confirm("Are you sure?\nThis action cannot be undone.");
  if (result) {
    const listID = deleteListButton2.dataset.deleteList;
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
    deleteListButton2.setAttribute("data-delete-list", defaultList.id);
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
console.log("outside");
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
//# sourceMappingURL=index.js.map
