import { User } from './../../models/User';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  invlidLogin:boolean;

  constructor(private service: UserService, private router: Router) {}

  ngOnInit() {
    this.service.user={
      id:null,
      name:"",
      email:"",
      password:"",
      todoList:null
    }
  }

  login(form: NgForm){
    this.service.login(form.value).subscribe(
      data => {
          this.service.user = data;
          localStorage.setItem("id",data.id.toString());
          localStorage.setItem("name",data.name);
          this.router.navigate(['/todo']);
      },
      error => {
        this.invlidLogin=true;
        console.log("error");
      }
    );

  }

}
