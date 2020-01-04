import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ProfileService} from './profile.service';
import { HttpClient } from '@angular/common/http';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username:string;
  email:string;
  phone:string;
  zip:string;
  pw:string;
  repw:string;
  alert:string;
  currUser: any;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: ProfileService,
    private http: HttpClient
  ) { 
    activatedRoute.queryParams.subscribe(queryParams => {
      this.username = queryParams.username
    })
  }

  ngOnInit() {
    // this.username = this.currUser.username;
    this.getCurrUser()
    return 1
  }
  toMain(){
    this.router.navigate(['/main'],{
      queryParams:{
        username: this.username
      }
    });
    return 1
  }

  validateForm(name, email, phone, zip, pw, repw){
    if(this.service.validateUN(name)){
      this.username = name;
      this.alert = ""
    }
    else{
      this.alert= "Use another name!"
    }

    if(email!=""){
      if(this.service.validateEmail(email)){
      this.email = email
      this.alert = ""
    }
    else{
      this.alert= "Email format is wrong!"
    }}

    if(phone!=""){
      if(this.service.validatePhone(phone)){
      this.phone = phone
      this.alert = ""
    }
    else{
      this.alert= "Phone format is wrong!"
    }}

    if(zip!=""){
      if(this.service.validateZip(zip)){
        this.zip = zip
        this.alert = ""
      }
      else{
        this.alert= "Zipcode format is wrong!"
      }}

    if(pw!="" || repw!=""){
      if(this.service.validatePW(pw,repw)){
        this.pw=pw
        this.alert=""
      }
      else{
        this.alert="Passwoard not match!"
      }
    }
    return 1
  }

  getCurrUser(){
    this.http.get("https://jsonplaceholder.typicode.com/users").subscribe(response => {
      if (response instanceof Array)
        response.forEach(elem => { 
          if(elem.username == this.username){
            this.currUser=elem;
            this.email=elem.email;
            this.phone=elem.phone;
            this.zip=elem.address.zipcode;
          }
        })
    });
    return 1
  }




}
