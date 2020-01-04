import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http  , ResponseOptions , Headers  , URLSearchParams } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient) { }

  returnUserObs(){
    // return this.http.get("https://jsonplaceholder.typicode.com/users");
    const d = {
      username:"yp24",
      password:"123"
    };
    // console.log(d.username);
    // console.log(this.http.post("https://hw-6-backend-yp24.herokuapp.com/login",d))
    
    // console.log(this.http.get("https://jsonplaceholder.typicode.com/users"))
    return this.http.post("https://hw-6-backend-yp24.herokuapp.com/login", d, {withCredentials: true});
  }

  // validateUser(username, pwd, users){
  //   for(let u of users){
  //     if( u.username == username && u.address.street==pwd){
  //         return 1
  //     }
  //   }
  //   return 0
  // }
  postLogin(username, pwd){
    const body = {
      "username":username,
      "password":pwd
    }
    return this.http.post("https://hw-6-backend-yp24.herokuapp.com/login", body, {withCredentials: true});
  }

}
