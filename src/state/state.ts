////////////////////////////////////////////////////////////////////////
// Todo Application State Interfaces
////////////////////////////////////////////////////////////////////////

import {createStore} from "@builder.io/qwik";
export interface TodoItem {
  completed: boolean;
  title: string;
  type: string;
  timeCost: number;
}

export interface Todos {
  filter: FilterStates;
  items: TodoItem[];
}

export function openMyDialog() {
  let myDialog:any = <any>document.getElementById("myModal");
  myDialog.style.display = 'block';
  myDialog.style.zIndex = 3;
}

export function closeMyDialog() {
  let myDialog:any = <any>document.getElementById("myModal");
  myDialog.style.display = 'none';
  myDialog.style.zIndex = 0;
}

////////////////////////////////////////////////////////////////////////
// Todo Application State Mutation Functions
////////////////////////////////////////////////////////////////////////

export function addItem(todos: Todos, text: string, type: string) {
  todos.items.push({ completed: false, title: text , type: type, timeCost: 0});
  updateFilter(todos);
}

export function removeItem(todos: Todos, todoItem: TodoItem) {
  todos.items = todos.items.filter((i) => i != todoItem);
  updateFilter(todos);
}
export function toggleItem(todos: Todos, todoItem: TodoItem) {
  if(todoItem.completed === false){
    todoItem.completed = !todoItem.completed;
  } else {
    todoItem.completed = !todoItem.completed;
    updateFilter(todos);
  }
}

export function saveItem(timeCost: string) {
console.log(timeCost)
}

export function clearCompleted(todos: Todos) {
  todos.items = todos.items.filter(FILTERS.active);
  updateFilter(todos);
}

////////////////////////////////////////////////////////////////////////
// Todo Application State Filter Functions
////////////////////////////////////////////////////////////////////////

export type FilterStates = 'all' | 'active' | 'completed';
export const FilterStates: FilterStates[] = ['all', 'active', 'completed'];
export const FILTERS = {
  all: () => true,
  active: (i: TodoItem) => i.completed == false,
  completed: (i: TodoItem) => i.completed == true,
};

export function updateFilter(todos: Todos, filter?: FilterStates) {
  if (filter) {
    todos.filter = filter.toLowerCase() as any;
  }
}

export function getFilteredItems(todos: Todos): TodoItem[] {
  return todos.items.filter(FILTERS[todos.filter]);
}

export function getFilteredCount(todos: Todos) {
  return getFilteredItems(todos).filter(FILTERS.active).length;
}
