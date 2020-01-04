import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';
import { HttpClientModule } from '@angular/common/http';

const currUser = { username: 'Bret', id: 1};
// const currPosts = []; 

describe('PostsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));


  it('should be created', () => {
    const service: PostsService = TestBed.get(PostsService);
    expect(service).toBeTruthy();
  });


  it(`should fetch articles for a valid user`, (done) => {
    const postServ: PostsService = TestBed.get(PostsService);
    let cnt = 0
    postServ.returnObs().subscribe(res=>{
      if (res instanceof Array)
        res.forEach(elem => {
          if (elem.userId == currUser.id)
            cnt += 1;
        });
      expect(cnt).toEqual(10);
      done();
    });
  });
  
});
