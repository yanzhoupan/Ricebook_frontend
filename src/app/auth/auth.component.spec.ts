import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute, RouterModule  } from '@angular/router';
import { AuthComponent, routes } from './auth.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from "@angular/common";
import { MainComponent } from '../main/main.component';
import { ProfileComponent } from '../profile/profile.component';
import { PostsComponent } from '../main/posts/posts.component';


// import { RegisterationComponent} from './registeration.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let location: Location;
  let router: Router;

  let username: HTMLInputElement;
  let pwd: HTMLInputElement;
  let btn: DebugElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), FormsModule, HttpClientTestingModule],
      declarations: [ AuthComponent, RegisterationComponent, MainComponent, ProfileComponent, PostsComponent ],
      providers:[AuthComponent]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    // // call ngOnInit
    // fixture.detectChanges();

    fixture.whenStable()
      .then(() => {
        // update view
        fixture.detectChanges();
      })

      router = TestBed.get(Router);
      router.initialNavigation();
      location = TestBed.get(Location);

      fixture.whenStable().then(()=>{
          fixture.detectChanges();
          // get the element by id
          username = fixture.debugElement.query(By.css('#usernameRef')).nativeElement;
          pwd = fixture.debugElement.query(By.css('#passwordRef')).nativeElement;
          btn = fixture.debugElement.query(By.css('#btnRef'));
      });
      // done();

  }));




  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should be initialized`, () => {
    expect(fixture).toBeDefined();
    expect(component).toBeDefined();
  });


  
  it('should not log in an invalid user', fakeAsync(() => {
    username.value = "invalidUserName";
    pwd.value = 'wrongPwd';
    username.dispatchEvent(new Event('input'));
    pwd.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    btn.nativeElement.click();
    // fixture.detectChanges();
    tick();
    expect(location.path()).toBe('/auth');
  }));

  
  it('should update error message state', fakeAsync(() => {
    username.value = "invalidUserName";
    pwd.value = 'wrongPwd';
    username.dispatchEvent(new Event('input'));
    pwd.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    spyOn(window, "alert");
    btn.nativeElement.click();

    tick();
    expect(window.alert).toHaveBeenCalledWith("Wrong username or password!");
  }));

  // it('should to main', ()=>{
  //   const authComp: AuthComponent = TestBed.get(AuthComponent);
  //   expect(authComp.toMain()).not.toBeNull()
  // })


});
