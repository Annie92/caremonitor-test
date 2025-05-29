import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { UserService } from '../../shared/services/user.service';
import { of, throwError } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {

    apiServiceSpy = jasmine.createSpyObj('ApiService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['setUsername']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule
      ],
      providers: [
        FormBuilder,
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: UserService, useValue: userServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize the form with empty fields and invalid state', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.invalid).toBeTrue();
  });
  it('should show error message for invalid email', fakeAsync(() => {
    const emailControl = component.email;
    emailControl.setValue('invalid-email');
    emailControl.markAsTouched();
    tick();
    component.updateErrorMessage();
    expect(component.errorMessage()).toBe('Not a valid email');
  }));
  it('should handle successful login', fakeAsync(() => {
    const mockResponse = { token: 'mock-token' };
    apiServiceSpy.login.and.returnValue(of(mockResponse));

    component.loginForm.setValue({ email: 'test@example.com', password: 'password' });

    component.onSubmit();
    tick();

    expect(apiServiceSpy.login).toHaveBeenCalledWith('test@example.com', 'password');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
    expect(userServiceSpy.setUsername).toHaveBeenCalledWith('test@example.com');
    expect(component.loginError).toBeNull();
  }));
  it('should handle login error', fakeAsync(() => {
    apiServiceSpy.login.and.returnValue(throwError(() => new Error('Unauthorized')));

    component.loginForm.setValue({ email: 'wrong@example.com', password: 'wrong' });

    component.onSubmit();
    tick();
    expect(component.loginError).toBe('Login failed. Please check your credentials.');
  }));
});
