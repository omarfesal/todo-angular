import { NgForm } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorRegisterMessage:string;
  invlidRegister:boolean;

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

  submit(form: NgForm){
    this.service.register(form.value).subscribe(
      data => {
          this.router.navigate(['/']);
      },
      error => {
        if(error.status == 409){
          this.invlidRegister=true;
          this.errorRegisterMessage="This Account is Exist!"
        }
        console.log(error.status);
      }
    );

  }

}
