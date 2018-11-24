import { UserService } from './user.service';
import { ToDo } from './../models/ToDo';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin':"*"

  })
};



@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  todo:ToDo;

  

  constructor(private httpclient:HttpClient , private service : UserService ) { }
  
  url: string = `http://localhost:8080/api`;


  saveTodo(todo: ToDo): Observable<ToDo> {
    console.log(JSON.stringify(todo));
    const url = `${this.url}/${this.service.user.id}/todo`;
    return this.httpclient.post<ToDo>(url , JSON.stringify(todo), httpOptions).pipe();
  }


  getToDoList(id?:string){
    const url = `${this.url}/${this.service.user.id}/todo`;
    return this.httpclient.get<ToDo[]>(url).pipe();
  }


  deleteToDo(id: number){
    const url = `${this.url}/${this.service.user.id}/todo/${id}`;
    return this.httpclient.delete(url , httpOptions).pipe();
  }


  update(todo : ToDo){
    let id = todo.id;
    const url = `${this.url}/${this.service.user.id}/todo/${todo.id}`;
    return this.httpclient.put(url , todo , httpOptions).pipe();
    
  }
  


}
