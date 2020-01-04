import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule, FormsModule, HttpClientTestingModule],
      declarations: [ ProfileComponent ],
      providers: [ProfileComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate form', ()=>{
    const profComp: ProfileComponent = TestBed.get(ProfileComponent);
    expect(profComp.validateForm('name', "email", "phone", "zip", "pw", "repw")).toEqual(1);
    expect(profComp.validateForm('', "email", "phone", "zip", "pw", "repw")).toEqual(1);
  });

  it('should return to main page', ()=>{
    const profComp: ProfileComponent = TestBed.get(ProfileComponent);
    expect(profComp.ngOnInit()).toEqual(1);
    expect(profComp.toMain()).toEqual(1);
  });
});
