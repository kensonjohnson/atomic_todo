import { getUnixTime, toDate } from "date-fns";

export default class Todo {
  constructor(
    title,
    parentList,
    description = null,
    priority = null,
    notes = null,
    checklist = null
  ) {
    this.title = title;
    this.parentList = parentList;
    this.description = description;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    this.dateCreated = getUnixTime(new Date());
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
