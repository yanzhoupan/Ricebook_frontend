import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';

describe('ProfilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileService = TestBed.get(ProfileService);
    expect(service).toBeTruthy();
  });

  it('should validate username', ()=>{
    const service: ProfileService = TestBed.get(ProfileService);
    expect(service.validateUN('username')).toEqual('username');
  });

  it('should validate password', ()=>{
    const service: ProfileService = TestBed.get(ProfileService);
    expect(service.validatePW('pw1','pw2')).toEqual(false);
    expect(service.validatePW('pw1','pw1')).toEqual(true);
  });

  it('should validate email', ()=>{
    const service: ProfileService = TestBed.get(ProfileService);
    expect(service.validateEmail('bad email')).toEqual(false);
    expect(service.validateEmail('123@gmail.com')).toEqual(true);
  });

  it('should validate phone', ()=>{
    const service: ProfileService = TestBed.get(ProfileService);
    expect(service.validatePhone('bad phone')).toEqual(false);
    expect(service.validatePhone('(123)123-1234')).toEqual(true);
  });

  it('should validate zipcode', ()=>{
    const service: ProfileService = TestBed.get(ProfileService);
    expect(service.validateZip('bad zip')).toEqual(false);
    expect(service.validateZip('77005')).toEqual(true);
  });
});
