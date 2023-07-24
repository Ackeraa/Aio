import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotComponent } from './forgot.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AngularTokenModule } from 'angular-token';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { AlertService } from '../../_services/alert.service';
import { of, throwError } from 'rxjs';
import { XStatus } from '../../_models';

fdescribe('ForgotComponent', () => {
  let component: ForgotComponent;
  let fixture: ComponentFixture<ForgotComponent>;
  let authService: AuthService;
  let alertService: AlertService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({}),
        AngularTokenModule.forRoot({}),
      ],
      providers: [AuthService, AlertService],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    alertService = TestBed.inject(AlertService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    expect(component.form.value.email).toBe('');
  });

  it('should set status to Clicked and not call authService.forgot if the form is invalid', () => {
    spyOn(authService, 'forgot');

    // Nothing filled in
    component.status = XStatus.Ready;
    component.onSubmit();

    expect(component.status).toBe(XStatus.Clicked);
    expect(authService.forgot).not.toHaveBeenCalled();

    // Invalid email
    component.status = XStatus.Ready;
    component.form.controls.email.setValue('invalid');
    component.onSubmit();

    expect(component.status).toBe(XStatus.Clicked);
    expect(authService.forgot).not.toHaveBeenCalled();
  });

  it('should call authService.forgot and redirected to /home if the form is valid', () => {
    const mockEmail = 'test@test.com';
    const mockFormData = { email: mockEmail };
    const mockResponse = 'Reset email sent';

    spyOn(authService, 'forgot').and.returnValue(of({ message: mockResponse }));
    spyOn(alertService, 'success');

    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.status = XStatus.Ready;
    component.form.controls.email.setValue(mockEmail);
    component.onSubmit();

    expect(component.status).toBe(XStatus.Succeed);
    expect(authService.forgot).toHaveBeenCalledWith(mockFormData);
    expect(alertService.success).toHaveBeenCalledWith(mockResponse, true);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should set status to Failed and display error message if email not exists', () => {
    const mockEmail = 'not_exists@test.com';
    const mockError = ['Email not found'];
    spyOn(authService, 'forgot').and.returnValue(throwError(() => mockError));
    component.form.controls.email.setValue(mockEmail);
    component.onSubmit();

    expect(authService.forgot).toHaveBeenCalled();
    expect(component.errors).toEqual(mockError);
    expect(component.status).toBe(XStatus.Failed);
  });

  it('should display loader and disable submit button during form submission', () => {
    component.status = XStatus.Sent;
    fixture.detectChanges();
    const spinnerElement =
      fixture.nativeElement.querySelector('.spinner-border');
    const submitButton = fixture.nativeElement.querySelector('button');

    expect(spinnerElement).toBeTruthy(); // Confirm that the loader is displayed
    expect(submitButton.disabled).toBeTruthy(); // Confirm that the submit button is disabled
  });

  it('should display error message from server correctly', () => {
    const mockError = ['Invalid email'];
    component.status = XStatus.Failed;
    component.errors = mockError;
    fixture.detectChanges();
    const errorElement = fixture.nativeElement.querySelector('.text-danger');

    expect(errorElement.textContent).toContain(mockError);
  });

  it('should display error message from client', () => {
    component.status = XStatus.Clicked;
    component.form.controls.email.setValue('invalid');
    fixture.detectChanges();
    const errorElement = fixture.nativeElement.querySelector('.text-danger');

    expect(errorElement).toBeTruthy();
  });
});
