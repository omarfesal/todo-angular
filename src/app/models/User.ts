import { ToDo } from './ToDo';
export interface User {
    id:number;
    name: string;
    email: string;
    password: string;
    todoList :ToDo[];
}
  
  