import getUnixTime from "date-fns/getUnixTime";
import toDate from "date-fns/toDate";
import { v4 as uuidv4 } from "uuid";

export default class Todo {
  readonly id: string;
  title: string;
  readonly parentListID: string;
  description: string;
  priority: number;
  notes: string;
  dateCreated: number;

  constructor(
    title: string,
    parentListID: string,
    description = "",
    priority = 2,
    notes = ""
  ) {
    this.id = uuidv4();
    this.title = title;
    this.parentListID = parentListID;
    this.description = description;
    this.priority = priority;
    this.notes = notes;
    this.dateCreated = getUnixTime(new Date());
  }

  getDateCreated() {
    return toDate(this.dateCreated);
  }
}
