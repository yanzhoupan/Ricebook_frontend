import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
// import { Component, OnInit, Input, SimpleChanges,OnChanges} from '@angular/core';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from "@angular/common/http/"
import { PostsComponent } from './posts.component';
import { MainComponent } from '../main.component';
import { PostsService } from './posts.service';



describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpClientModule, HttpClientTestingModule],
      declarations: [ PostsComponent, MainComponent ],
      providers: [PostsComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    
    component.currUser = { username: 'Bret', id: 1};
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should post a new article', () => {
    const postComp: PostsComponent = TestBed.get(PostsComponent);
    expect(postComp.post('post test')).toEqual(1);
    expect(postComp.post('')).toEqual(0);
  });

  it('should filter', () =>{
    const postComp: PostsComponent = TestBed.get(PostsComponent);
    expect(postComp.filter('should filter')).toEqual(1);
    expect(postComp.filter('')).toEqual(0)
  })

  // it("should initial", ()=>{
  //   const postComp: PostsComponent = TestBed.get(PostsComponent);
  //   expect(postComp.ngOnInit()).toBeNull();
  // })
});
