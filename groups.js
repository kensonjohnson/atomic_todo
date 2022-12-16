import { v4 as uuidv4 } from "uuid";
export default class Groups {
  constructor() {
    this.groups = new Map();
  }
  addList(list) {
    if (!list) {
      return null;
    }
    const id = uuidv4();
    this.groups.set(id, list);
    return id;
  }
  getList(id) {
    if (!id || typeof id !== "string") {
      return null;
    }
    return this.groups.get(id);
  }
  getAllLists() {
    let array = [];
    this.groups.forEach((list) => {
      array.push(list);
    });
    return array;
  }
}
