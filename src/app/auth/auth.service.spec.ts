import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });


  it('should log in a valid user ', ((done) => {
    const authService: AuthService = TestBed.get(AuthService);
    let valid = 0;
    let uesrname = 'Bret';
    let pwd = 'Kulas Light';
    authService.returnUserObs().subscribe(res => {
      if (res instanceof Array)
        res.forEach(ele => {
          if(ele.username == uesrname && ele.address.street==pwd)
          valid = 1
        });
      expect(valid).toEqual(1);
      done();
    })
    expect(authService.validateUser('username','pwd','u')).not.toBeNull();
  }));

  
});
