import { Injectable } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http'; 
import { HttpClient } from '@angular/common/http';
// import { ClientBaseInfo, responseResult } from '../model/ClientBaseInfo';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  posts = [];
  constructor( private http: HttpClient) { }

  // getPosts(articles: Array<any>){
  //   this.http.get("https://jsonplaceholder.typicode.com/posts").subscribe(response => {
  //     if (response instanceof Array)
  //       response.forEach(elem => { articles.push(elem); })
  //   });
  // }

  // getSomething(): Promise <any[]>{
  //   return Promise.resolve(this.posts)
  // }
  returnObs(username){
    return this.http.get("https://hw-6-backend-yp24.herokuapp.com/articles/"+username, {withCredentials: true});
  }

  // get the 10 posts according to the username(id)
  getmyPost(posts, username){
    this.returnObs(username).subscribe(ele => {
      const res:any = ele
      if (res.articles instanceof Array)
      
        res.articles.forEach(elem => { 
          // console.log(elem)
            if(elem.author == username){
              // console.log(elem)
            posts.push(elem);
          }
        })
    });
  }

  getDate(){
    var now= new Date();
    var year=now.getFullYear();
    var month=now.getMonth();
    var date=now.getDate();
    return year+'-'+ month +'-'+ date
  }

  copyMypost(myPosts){
    return Object.assign([], myPosts);
   }

   postArticle(text){
     const body = {
       "text": text
     }
    return this.http.post("https://hw-6-backend-yp24.herokuapp.com/article", body, {withCredentials: true});
   }

}
