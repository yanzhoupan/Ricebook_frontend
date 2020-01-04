import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MainComponent } from '../main/main.component';
import { ProfileComponent } from '../profile/profile.component';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  username = '';
  password = '';
  legalName = [];
  // matchUser=0;
  users=[];
  isloggedin = 0;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {
    
  }

  ngOnInit() {
    // this.getUsers();
  }

  toMain() {
    const loginResultObs = this.authService.postLogin(this.username, this.password);
    loginResultObs.subscribe(ele=>{
      const res:any = ele;
      console.log(res)
      if(res.result == "success"){
        // localStorage.setItem("user", res.username);
        // redirect to main page
        this.isloggedin = 1
        this.router.navigate(['/main'],{ 
        queryParams:{
          username: this.username
        }
      });
      }
      else{
        alert("Wrong username or password!");
      }
    })
      // if (!this.isloggedin){
      //   alert("Wrong username or password!");
      // }

  }


  // getUsers(){
  //   console.log("getUsers")
  //   this.authService.returnUserObs().subscribe(response => {
  //     const result: any = response
  //     console.log(result)
  //     if (response instanceof Array)
  //       response.forEach(elem => { 
  //           console.log(elem);
  //           this.users.push(elem)
  //       })
  //   });
  // }
}


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
];
