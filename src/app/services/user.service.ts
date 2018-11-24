import { Router } from '@angular/router';
import { User } from './../models/User';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin':"*"
  })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user:User
  url: string = "http://localhost:8080/api";

  constructor(private httpclient:HttpClient , private router: Router ) { }
    

  register(user: User): Observable<User> {
    return this.httpclient.post<User>(`${this.url}/register` , user, httpOptions).pipe();
  }

  login(user: User): Observable<User> {
    return this.httpclient.post<User>(`${this.url}/login` , user, httpOptions).pipe();
  }

  isLoggedIn(){
    if(localStorage.getItem("id")){
      const loginedUser ={ 
        id: Number(localStorage.getItem("id")),
        name: localStorage.getItem("name")
      } as User;

      this.user = loginedUser;

    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
