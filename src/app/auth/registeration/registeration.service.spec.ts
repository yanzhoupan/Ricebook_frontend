import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterationService } from './registeration.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('RegisterationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, HttpClientModule],
    providers: [HttpClient]
  }));

  it('should be created', () => {
    const service: RegisterationService = TestBed.get(RegisterationService);
    expect(service).toBeTruthy();
  });


  it('should get date', ()=>{
    const service: RegisterationService = TestBed.get(RegisterationService);
    expect(service.getDate()).not.toBeNull();
  });

  it('should validate account name', ()=>{
    const service: RegisterationService = TestBed.get(RegisterationService);
    expect(service.validataAccountName('account name', [])).not.toBeNull();
  });

  it('should validate age', ()=>{
    const service: RegisterationService = TestBed.get(RegisterationService);
    expect(service.validateAge('1997121100')).not.toBeNull();
  });

  it('should validate password', ()=>{
    const service: RegisterationService = TestBed.get(RegisterationService);
    expect(service.validateconfirmPw('pw1', 'pw2')).not.toBeNull();
  });

  it('should validate phone', ()=>{
    const service: RegisterationService = TestBed.get(RegisterationService);
    expect(service.validatePhone('8328731111')).not.toBeNull();
  });

});
