import { getUnixTime, toDate } from "date-fns";
import { v4 as uuidv4 } from "uuid";

export default class Todo {
  constructor(
    title,
    parentList,
    description = "",
    priority = 2,
    notes = "",
    checklist = []
  ) {
    this.id = uuidv4();
    this.title = title;
    this.parentList = parentList;
    this.description = description;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    this.dateCreated = getUnixTime(new Date());
    return this.id;
  }

  get id() {
    return this.id;
  }

  get title() {
    return this.title;
  }

  get description() {
    return this.description;
  }

  get priority() {
    return this.priority;
  }

  get notes() {
    return this.notes;
  }

  get checklist() {
    return this.checklist;
  }

  get dateCreated() {
    return toDate(this.dateCreated);
  }
}
