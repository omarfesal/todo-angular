import { TodoServiceService } from './services/todo-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';



import { AppComponent } from './app.component';
import { todoComponent } from './components/todo/todo.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    todoComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '' ,
        component: LoginComponent
      },
      {
        path: 'register' ,
        component: RegisterComponent
      },
      {
        path: 'todo' ,
        component: todoComponent
      }
    ]),
    ReactiveFormsModule
  ],
  providers: [TodoServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
