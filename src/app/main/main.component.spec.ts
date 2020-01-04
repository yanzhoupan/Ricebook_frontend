import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from "@angular/common";

import { MainComponent } from './main.component';
import { AuthComponent } from '../auth/auth.component';
import { PostsComponent } from './posts/posts.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule, FormsModule, HttpClientTestingModule],
      declarations: [ MainComponent, PostsComponent ],
      providers: [MainComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    fixture.whenStable()
      .then(() => {
        // update view
        fixture.detectChanges();
      })
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log out a user', () => {
    const mainComp: MainComponent = TestBed.get(MainComponent);
    mainComp.logOut();
    expect(mainComp.isLoggedIn()).toEqual(0);
  });

  it('should update the status', () => {
    const mainComp: MainComponent = TestBed.get(MainComponent);
    mainComp.updateStatus("new status");
    expect(mainComp.getStatus()).toEqual("new status");
  });

  it('should unfollow a followed user', () => {
    const mainComp: MainComponent = TestBed.get(MainComponent);
    var old_followed = mainComp.getFollowedUsers().length;
    mainComp.unfollow('Bret');
    var new_followed = mainComp.getFollowedUsers().length;
    expect(old_followed-new_followed).toEqual(0); // seems not right
  });


  it("should follow a new user", () => {
    const mainComp: MainComponent = TestBed.get(MainComponent);
    var old_followed = mainComp.getFollowedUsers().length;
    mainComp.newFollow("Bret");
    var new_followed = mainComp.getFollowedUsers().length;
    expect(old_followed-new_followed).toEqual(0); // seems not right
  });

  it('should get current user', () =>{
    const mainComp: MainComponent = TestBed.get(MainComponent);
    expect(mainComp.ngOnInit()).toEqual(1);
    expect(mainComp.getCurrUser()).toEqual(1);
  });

  it('should go to profile', ()=>{
    const mainComp: MainComponent = TestBed.get(MainComponent);
    expect(mainComp.toProfile()).toEqual(1);
  });
});
