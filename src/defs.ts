import type { Todo } from "./todo";

export type List = Map<string, Todo>;

export type GroupItem = { id: string; name: string; list: List };

export type Group = GroupItem[];
