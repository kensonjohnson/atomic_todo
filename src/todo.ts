import toDate from "date-fns/toDate";
import { v4 as uuidv4 } from "uuid";

export class Todo {
  private _id = uuidv4();
  private _dateCreated = new Date();

  title: string;
  description: string = "Click to add description";
  priority: number = 1;
  completed: boolean = false;

  constructor(title = "New Item") {
    this.title = title;
  }

  get dateCreated() {
    return toDate(this._dateCreated);
  }

  get id() {
    return this._id;
  }
}
