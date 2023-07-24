import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AngularTokenModule } from 'angular-token';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { AlertService } from '../../_services/alert.service';
import { of, throwError } from 'rxjs';
import { XStatus } from '../../_models';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let alertService: AlertService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot({}),
        AngularTokenModule.forRoot({}),
      ],
      providers: [AuthService, AlertService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    alertService = TestBed.inject(AlertService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    expect(component.form.value.name_email).toBe('');
    expect(component.form.value.password).toBe('');
  });

  it('should display error when name_email field is empty and form is submitted', () => {
    const nameEmailInput = component.form.controls.name_email;
    nameEmailInput.setValue('');
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.text-danger');
    expect(errorElement.textContent).toBeTruthy;
    expect(component.status).toBe(XStatus.Clicked);
  });

  it('should display error when password field is empty and form is submitted', () => {
    const passwordInput = component.form.controls.password;
    passwordInput.setValue('');
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.text-danger');
    expect(errorElement.textContent).toBeTruthy;
    expect(component.status).toBe(XStatus.Clicked);
  });

  it('should call AuthService.login() with correct data when form is submitted', () => {
    const mockNameEmail = 'test@example.com';
    const mockPassword = 'password123';
    const formData = { login: mockNameEmail, password: mockPassword };
    spyOn(authService, 'login').and.returnValue(of(null));

    const nameEmailInput = component.form.controls.name_email;
    nameEmailInput.setValue(mockNameEmail);

    const passwordInput = component.form.controls.password;
    passwordInput.setValue(mockPassword);

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(authService.login).toHaveBeenCalledWith(formData);
    expect(component.status).toBe(XStatus.Succeed);
  });

  it('should navigate to the returnUrl after successful login', () => {
    const mockReturnUrl = '/home';
    const mockEmail = 'test@test.com';
    const mockPassword = 'password123';

    component.returnUrl = mockReturnUrl;

    const nameEmailInput = component.form.controls.name_email;
    nameEmailInput.setValue(mockEmail);

    const passwordInput = component.form.controls.password;
    passwordInput.setValue(mockPassword);

    spyOn(authService, 'login').and.returnValue(of('OK'));
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith([mockReturnUrl]);
    expect(component.status).toBe(XStatus.Succeed);
  });

  it('should display error message when AuthService.login() returns an error', () => {
    const mockEmail = 'test@test.com';
    const mockPassword = 'password123';
    const mockError = ['Invalid credentials'];
    spyOn(authService, 'login').and.returnValue(throwError(() => mockError));

    const nameEmailInput = component.form.controls.name_email;
    nameEmailInput.setValue(mockEmail);

    const passwordInput = component.form.controls.password;
    passwordInput.setValue(mockPassword);

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.text-danger');
    expect(errorElement.textContent).toContain(mockError[0]);
    expect(component.status).toBe(XStatus.Failed);
  });
});
