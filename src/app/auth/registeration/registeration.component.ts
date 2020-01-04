import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterationService } from './registeration.service';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {
  users = [];
  constructor(
    private http: HttpClient, 
    private service: RegisterationService, 
    private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.http.get("https://jsonplaceholder.typicode.com/users").subscribe(response => {
      if (response instanceof Array)
        response.forEach(elem => { 
            this.users.push(elem)
        })
    });
  }

  validateForm(un, display, em, ph, birth, zip, pw, repw){
    if (this.service.validateAge(birth) && 
        this.service.validateconfirmPw(pw, repw) &&
        this.service.validataAccountName(un, this.users) &&
        this.service.validatePhone(ph)){
          // this.router.navigate(['/main']);
          // alert("Successfully created a new user!")
          this.service.postRegister(un, pw, display, em, birth, zip).subscribe(ele=>{
            const res:any = ele;
            if(res.result=="success"){
              // can not directly go to the main page, must log in!
              alert("Successfully created a new user! You can login now!")
          }
          else alert("User already exist!")
          });
          
    }
    return 1
  }

}
