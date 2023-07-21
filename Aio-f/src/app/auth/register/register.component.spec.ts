import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AngularTokenModule } from 'angular-token';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../_services/auth.service';
import { AlertService } from '../../_services/alert.service';
import { of, throwError } from 'rxjs';
import { XStatus } from '../../_models';
import { th } from 'date-fns/locale';

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let alertService: AlertService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot({}),
        AngularTokenModule.forRoot({}),
      ],
      providers: [AuthService, AlertService],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    alertService = TestBed.inject(AlertService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    expect(component.form.value.name).toBe('');
    expect(component.form.value.email).toBe('');
    expect(component.form.value.password).toBe('');
    expect(component.form.value.passwordConfirm).toBe('');
  });

  it('should display error when name field is empty and form is submitted', () => {
    const nameInput = component.form.controls.name;
    nameInput.setValue('');
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('.text-danger');
    expect(error.textContent).toBeTruthy;
    expect(component.status).toBe(XStatus.Clicked);
  });

  it('should display error when email field is empty and form is submitted', () => {
    const emailInput = component.form.controls.email;
    emailInput.setValue('dasd');
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('.text-danger');
    expect(error.textContent).toBeTruthy;
    expect(component.status).toBe(XStatus.Clicked);
  });

  it('should display error when password field is empty and form is submitted', () => {
    const passwordInput = component.form.controls.password;
    passwordInput.setValue('');
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('.text-danger');
    expect(error.textContent).toBeTruthy;
    expect(component.status).toBe(XStatus.Clicked);
  });

  it('should display error when passwordConfirm field is empty and form is submitted', () => {
    const passwordConfirmInput = component.form.controls.passwordConfirm;
    passwordConfirmInput.setValue('');
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('.text-danger');
    expect(error.textContent).toBeTruthy;
    expect(component.status).toBe(XStatus.Clicked);
  });

  it('should display error when passwordConfirm field is different from password field and form is submitted', () => {
    const passwordInput = component.form.controls.password;
    passwordInput.setValue('123456');
    const passwordConfirmInput = component.form.controls.passwordConfirm;
    passwordConfirmInput.setValue('1234567');
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('.text-danger');
    expect(error.textContent).toBeTruthy;
    expect(component.status).toBe(XStatus.Clicked);
  });

  it('should display error from backend when form is submitted', () => {
    const nameInput = component.form.controls.name;
    nameInput.setValue('JohnDoe');

    const emailInput = component.form.controls.email;
    emailInput.setValue('test@email.com');

    const passwordInput = component.form.controls.password;
    passwordInput.setValue('123456');

    const passwordConfirmInput = component.form.controls.passwordConfirm;
    passwordConfirmInput.setValue('123456');

    const mockError = {
      name: ['has already been taken'],
      email: ['has already been taken'],
      password: ['is too short (minimum is 6 characters)'],
      password_confirmation: ["doesn't match Password"],
    };
    spyOn(authService, 'register').and.returnValue(throwError(() => mockError));

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const errors = fixture.nativeElement.querySelectorAll('.text-danger');
    expect(errors[0].textContent).toContain(mockError.name[0]);
    expect(errors[1].textContent).toContain(mockError.email[0]);
    expect(errors[2].textContent).toContain(mockError.password[0]);
    expect(errors[3].textContent).toContain(mockError.password_confirmation[0]);
    expect(component.status).toBe(XStatus.Received);
  });

  it('should navigate to login page after successful registration', () => {
    const nameInput = component.form.controls.name;
    nameInput.setValue('JohnDoe');

    const emailInput = component.form.controls.email;
    emailInput.setValue('test@test.com');

    const passwordInput = component.form.controls.password;
    passwordInput.setValue('123456');

    const passwordConfirmInput = component.form.controls.passwordConfirm;
    passwordConfirmInput.setValue('123456');

    spyOn(authService, 'register').and.returnValue(of(null));
    spyOn(alertService, 'success');

    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/auth/login']);
    expect(component.status).toBe(XStatus.Received);
    expect(alertService.success).toHaveBeenCalled();
  });
});
