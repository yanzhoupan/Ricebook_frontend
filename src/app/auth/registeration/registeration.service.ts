import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { pbkdf2 } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class RegisterationService {
  users = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }



  getDate(){
    var now = new Date();
    var date; 
    date = (now.getFullYear()) +"-" + (now.getMonth() + 1 ) + "-" + now.getDate() + "_" + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + ":" + now.getMilliseconds(); 
    return date;
    }
  
  validateAge(birthday){
      // validate age
      var age;
      var birth = birthday; 
      var birthYear = parseInt(birth.substr(0,4));
      var birthMonth = parseInt(birth.substr(5,2));
      var birthDay = parseInt(birth.substr(8,2));
      var d = new Date();
      var nowYear = d.getFullYear();
      var nowMonth = d.getMonth() + 1;
      var nowDay = d.getDate();
      if(nowYear == birthYear){
          age = 0;//同年 则为0岁
      }
      else{
          var ageDiff = nowYear - birthYear ; //年之差
          if(ageDiff > 0){
              if(nowMonth == birthMonth){
                  var dayDiff = nowDay - birthDay;//日之差
                  if(dayDiff < 0){
                      age = ageDiff - 1;
                  }
                  else{
                      age = ageDiff ;
                  }
              }
              else{
                  var monthDiff = nowMonth - birthMonth;//月之差
                  if(monthDiff < 0){
                      age = ageDiff - 1;
                  }
                  else{
                      age = ageDiff ;
                  }
              }
          }
          else{
              age = -1;//返回-1 表示出生日期输入错误 晚于今天
          }
      }
      if (age < 18){
          alert("You have to be over 18 years old!");
          return false;
      }
      return true;
  }


  validateconfirmPw(pw1, pw2){
    // validate password
    var pw = pw1;
    var confirmpw = pw2;
    if (pw != confirmpw || pw.length == 0){
      if (pw != confirmpw){
        alert("The two passwords did not match!");
      }
      else{
        alert("Please set your password!")
      }
      return false;
        
    }
    return true;
  }


  validataAccountName(un, users){
    for(let u of users){
      if (u.username == un){
        alert("Username not available, use another one!");
        return false
      }
    }

    var Aname = un;
    var re = /^([a-zA-z]{1})[A-Za-z0-9]*/g
    if(!re.test(Aname)){
        alert("Please choose a new account name!");
        return false;
    }
    return true;
  }

  validatePhone(ph){
    var phone = ph;
    var re = /^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/g
    if(!re.test(phone)){
        alert("Check your phone number!");
        return false;
    }
    return true;
  }

  postRegister(un, pw, display, em, birth, zip){
    const body = {
      "username": un,
      "password": pw,
      "displayname": display,
      "email": em,
      "dob": birth,
      "zipcode": zip
    }
    return this.http.post("https://hw-6-backend-yp24.herokuapp.com/register", body, {withCredentials: true});
  }

}
