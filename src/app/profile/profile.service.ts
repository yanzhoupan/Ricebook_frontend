import { Injectable } from '@angular/core';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  validateUN(name){
    return name
  }

  validatePW(pw, repw){
    if(pw==repw){
      return true
    }
    return false
  }

  validateEmail(email){
    var re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/g
    if(!re.test(email)){
      return false
    }
    return true
  }

  validatePhone(phone){
    var re = /^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/g
    if(!re.test(phone)){
        return false;
    }
    return true;
  }

  validateZip(zip){
    var re = /[0-9]{5}$/g
    if(!re.test(zip)){
      return false;
    }
    return true;
  }

}
