import { Component, OnInit, Input, SimpleChanges,OnChanges, SimpleChange} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PostsService } from './posts.service';
import {FormControl} from "@angular/forms";
import { Observable, of, observable } from 'rxjs';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  // inputs: ["currUser"]
})
export class PostsComponent implements OnInit, OnChanges {
  @Input() currUser: Array<any>;
  @Input() changeTrigger: number;
  shouldPostUser = [];
  stateCtrl: FormControl;
  // articles=[];
  filteredItems=[];
  newPostValue: string;
  new_post = {text:"", userId:"", author:"", date:""};
  myPosts = [];
  users=[];
  username: string;
  date:string;
  

  constructor(
    private http: HttpClient,
    private postsService: PostsService,
    ) { }

  ngOnChanges(changes: SimpleChanges ): void {
    if (changes['changeTrigger']!=undefined){
      console.log(changes);
      console.log(this.currUser);
      this.refresh();
    }
    // if (changes['currUser']!=undefined){
    //   if (changes['currUser'].previousValue!=undefined && changes['currUser'].currentValue != changes['currUser'].previousValue) {
    //   console.log(changes['currUser'])
    //   this.currUser = changes['currUser'].currentValue
    //   this.refresh();
    // }
    // }
}

  refresh(): void{
    this.ngOnInit();
  }

  ngOnInit() {
    console.log("currUser:", this.currUser)
    this.username = this.currUser[0]
    this.myPosts = [];
    this.filteredItems = [];
    for(var i=0; i <= this.currUser.length; i++){
      // console.log("ready to get articles", this.currUser)
      this.postsService.getmyPost(this.myPosts, this.currUser[i]);
      this.postsService.getmyPost(this.filteredItems, this.currUser[i]);
    }

    
    this.newPostValue = "";
    // this.username = this.currUser.username;
    this.date = this.postsService.getDate();
  }


//  filter the article to show(according to the input value)
 filter(value){
  this.filteredItems = this.postsService.copyMypost(this.myPosts);//when you fetch collection from server.
    if(!value){
      this.filteredItems = this.postsService.copyMypost(this.myPosts);  //when nothing has typed
      return 0
    }
    this.filteredItems = Object.assign([], this.filteredItems).filter(
       item => item.text.toLowerCase().indexOf(value.toLowerCase()) > -1
      //  item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
    return 1
 }

clear(){
  this.newPostValue = "";
}
//  post a new article
 post(text){
  if(text!=""){
    this.new_post.text = text;
    this.new_post.author = this.username;
    this.new_post.date = this.date;
    // console.log("new post:", this.new_post.body)
    this.filteredItems.splice(0,0,this.new_post)
    // console.log("fiteredItems:", this.filteredItems)
    this.clear();
    this.postsService.postArticle(text).subscribe(ele=>{ })
    return 1;
  }
  return 0
}

}
