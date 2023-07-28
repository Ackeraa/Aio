import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ResetComponent } from './reset.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AngularTokenModule } from 'angular-token';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../_services/auth.service';
import { AlertService } from '../../_services/alert.service';
import { of, throwError } from 'rxjs';
import { XStatus } from '../../shared/models';

fdescribe('ResetComponent', () => {
  let component: ResetComponent;
  let fixture: ComponentFixture<ResetComponent>;
  let authService: AuthService;
  let alertService: AlertService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ResetComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot({}),
        AngularTokenModule.forRoot({}),
      ],
      providers: [AuthService, AlertService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService);
    alertService = TestBed.inject(AlertService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    expect(component.form.value.password).toBe('');
    expect(component.form.value.passwordConfirm).toBe('');
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

  it('should display error when passwordConfirm field is empty and form is submitted', () => {
    const passwordConfirmInput = component.form.controls.passwordConfirm;
    passwordConfirmInput.setValue('');
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.text-danger');
    expect(errorElement.textContent).toBeTruthy;
    expect(component.status).toBe(XStatus.Clicked);
  });

  it('should display error when passwordConfirm field does not match password field', () => {
    const passwordInput = component.form.controls.password;
    passwordInput.setValue('password123');

    const passwordConfirmInput = component.form.controls.passwordConfirm;
    passwordConfirmInput.setValue('password456');
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.text-danger');
    expect(errorElement.textContent).toBeTruthy;
    expect(component.status).toBe(XStatus.Clicked);
  });

  it('should navigate to /auth/login after successful password reset', () => {
    const mockRes = { message: 'reset successful' };
    const mockPassword = 'password123';

    const passwordInput = component.form.controls.password;
    passwordInput.setValue(mockPassword);

    const passwordConfirmInput = component.form.controls.passwordConfirm;
    passwordConfirmInput.setValue(mockPassword);

    spyOn(authService, 'reset').and.returnValue(of(mockRes));
    spyOn(alertService, 'success');

    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(alertService.success).toHaveBeenCalledWith(mockRes.message, true);
    expect(navigateSpy).toHaveBeenCalledWith(['/auth/login']);
    expect(component.status).toBe(XStatus.Succeed);
  });

  it('should display error message when AuthService.reset() returns an error', () => {
    const mockError = { password_confirmation: ['Password does not match'] };
    const mockPassword = 'password123';

    const passwordInput = component.form.controls.password;
    passwordInput.setValue(mockPassword);

    const passwordConfirmInput = component.form.controls.passwordConfirm;
    passwordConfirmInput.setValue(mockPassword);

    spyOn(authService, 'reset').and.returnValue(throwError(() => mockError));

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.text-danger');
    expect(errorElement.textContent).toContain(mockError.password_confirmation);
    expect(component.status).toBe(XStatus.Failed);
  });
});
