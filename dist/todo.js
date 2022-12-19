import toDate from "../_snowpack/pkg/date-fns/toDate.js";
import {v4 as uuidv4} from "../_snowpack/pkg/uuid.js";
export class Todo {
  constructor(title = "New Item") {
    this._id = uuidv4();
    this._dateCreated = new Date();
    this.description = "Click to add description";
    this.priority = 1;
    this.completed = false;
    this.open = false;
    this.title = title;
  }
  get dateCreated() {
    return toDate(this._dateCreated);
  }
  get id() {
    return this._id;
  }
}
