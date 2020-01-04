import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthComponent } from '../auth/auth.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  myId: number;
  status: string;
  username: string;
  users=[];
  currUser=[]; // current logged in user and the user he/she followed
  followedUsers=[];
  loggedin = 1;
  followedNum = this.followedUsers.length;
  newStatusValue = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { 
    activatedRoute.queryParams.subscribe(queryParams => {
      this.username = queryParams.username
    })
  }

  ngOnInit() {
    // this.getUsers();
    this.getCurrUser();
    this.getHeadLine();
    // this.getFollowedUser();
    return 1
  }

  toProfile(){
    this.router.navigate(['/profile'],{
      queryParams:{
        username: this.username
      }
    });
    return 1
  }

  logOut(username){
    this.loggedin = 0;
    const body = {
      "username": username
    }
    console.log("logout")
    this.http.put("https://hw-6-backend-yp24.herokuapp.com/logout", body, {withCredentials: true}).subscribe(ele=>{
      const res:any = ele;
      console.log("logout:", res)
      if(res.status == 'success')
      this.router.navigate(['/auth']);
    })
    // this.router.navigate(['/auth']);
  }

  isLoggedIn(){
    return this.loggedin;
  }

  updateStatus(newStatus){
    console.log("updateStatus")
    if (newStatus!=""){
      console.log(newStatus);
      const body = {
        "headline":newStatus
      }
      this.http.put("https://hw-6-backend-yp24.herokuapp.com/headline", body, {withCredentials: true}).subscribe(ele => {
        const res:any = ele;
        this.status=res.headline;
      });
      // this.status=newStatus;
      // this.getHeadLine();
      this.clear();
    }
  }

  clear(){
    this.newStatusValue = ""
  }

  getStatus(){
    return this.status;
  }

  getCurrUser(){
    this.currUser.push(this.username)
    // this.http.get("https://hw-6-backend-yp24.herokuapp.com/headlines/"+this.username).subscribe(response => {
    //   if (response instanceof Array)
    //     response.forEach(elem => { 
    //       if(elem.username == this.username){
    //         this.currUser.push(elem);
    //         this.username = elem.username;
    //         this.status = elem.company.catchPhrase;
    //         this.myId = elem.id;
    //       }
    //     })
    // });
    // return 1
  }

  // getFollowedUser(){
  //   this.http.get("https://jsonplaceholder.typicode.com/users").subscribe(response => {
  //     if (response instanceof Array)
  //       response.forEach(elem => { 
  //         if(elem.id == (this.myId+1)%10 || elem.id == (this.myId+2)%10 || elem.id == (this.myId+3)%10){  //此处应该是模总用户数
  //           this.followedUsers.push(elem);
  //         }
  //       })
  //   });
  // }

  getHeadLine(){
    this.http.get("https://hw-6-backend-yp24.herokuapp.com/headlines/"+this.username, {withCredentials: true}).subscribe(ele=>{
      const res:any = ele;
      this.status = res.headlines[0].headline
    })
  }

  unfollow(username){
    this.followedUsers = this.followedUsers.filter(
      item => item.username != username
    )
    this.currUser = this.currUser.filter(
      item => item.username != username
    )
    this.followedNum -= 1;
  }

  getFollowedUsers(){
    return this.followedUsers;
  }

  newFollow(newPersonName){
    if (!newPersonName){
      return
    }
    var newPerson: any;
    for(let u of this.users){
      if( u.username == newPersonName){
        newPerson = u
      }
    }
    
    if(newPerson.length!=0){
      let already = 0
      if(this.currUser[0].id==newPerson.id){
        already = 1
        alert("You can not follow yourself!")
      }
      else{
        for(let u of this.currUser){
        if(u.id==newPerson.id){
          already = 1
          alert("Already followed him/her!")
        }
      }
      }
      
      if(!already){
        this.followedUsers.splice(0,0,newPerson);
        this.currUser.push(newPerson)
        this.followedNum += 1;
        // this.ngOnInit();
      }
    }
    else{
      alert("No such person!");
    }
  }

  getUsers(){
    this.http.get("https://jsonplaceholder.typicode.com/users").subscribe(response => {
      if (response instanceof Array)
        response.forEach(elem => { 
            this.users.push(elem)
        })
    });
  }

}


// export const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'auth',
//     pathMatch: 'full'
//   },
//   {
//     path: 'auth',
//     component: AuthComponent
//   },
//   {
//     path: 'main',
//     component: MainComponent
//   },
//   {
//     path: 'profile',
//     component: ProfileComponent
//   },
// ];