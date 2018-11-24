import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { ToDo } from '../../models/ToDo';
import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from 'src/app/services/todo-service.service';
import { Tag } from 'src/app/models/Tag';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class todoComponent implements OnInit {

  errorNotExist: boolean = true;
  todoList : ToDo[] = [];
  tags :Tag[] = [];
  baseTodoList = [];

  constructor(

    private toDoService: TodoServiceService , 
    private userSerivce: UserService , 
    private router: Router) {}

  ngOnInit() {
    this.userSerivce.isLoggedIn();
    
    this.toDoService.todo={
      id: null,
      name: "",
      description: "",
      complete: false,
      user_id:null,
      tags: [] 
    }

    this.toDoService.getToDoList().subscribe(
      response => {
        this.todoList = response;
      }
    , error => {
      this.errorNotExist = false;
    });
  }

  
  createTodo(input: NgForm){
    let newToDo = this.toDoService.todo;
    newToDo= input.value;
    newToDo.tags = this.toDoService.todo.tags;
    console.log(newToDo);    
    this.toDoService.saveTodo(newToDo)
      .subscribe((todo) =>{
        
        if(this.todoList.length == 0) this.todoList=[];

        this.todoList.splice(0,0,todo);
      } 
    );
    input.resetForm();
    this.tags= [];
  }

  delete(todo){
    let index = this.todoList.indexOf(todo);
    this.todoList.splice(index,1);
    this.toDoService.deleteToDo(todo.id).subscribe();
  }


  isDone(todo: ToDo){
      todo.complete = !todo.complete;
      console.log(todo.complete);
      this.toDoService.update(todo).subscribe((todo)=>{
        console.log(todo);
      });
  }

  addTag(tag){
    this.tags.push(tag.value);

    let newTag = {
      "name": tag.value
    } as Tag;

    this.toDoService.todo.tags.push(newTag);
    tag.value = "";
    tag.focus();
    console.log(this.toDoService.todo.tags);
  }


  filter(tagSearch){
    if(this.baseTodoList.length > 0)
      this.todoList =  this.baseTodoList;

    if(tagSearch.value===""){
      this.todoList = this.baseTodoList;
      return;
    }
    let fillteredArr = [];
    this.todoList.forEach( todo => {
      todo.tags.forEach(tag =>{
        if(tag.name.startsWith(tagSearch.value)){
          fillteredArr.push(todo);
        }
      })
    })
    this.baseTodoList = this.todoList;
    this.todoList = fillteredArr;

  }


  selectDone(doneCheck){
    if(doneCheck.value == 'false'){
      this.baseTodoList = this.todoList;
      doneCheck.value = 'true';
      this.todoList = this.todoList.filter(todo=>{
        if(todo.complete == true)
          return todo;
      })
    }
    else{
      doneCheck.value = 'false';
      this.todoList = this.baseTodoList;
    }
  }




}
