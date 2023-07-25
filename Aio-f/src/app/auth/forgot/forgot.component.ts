import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService, AuthService } from '../../_services';
import { XStatus } from '../../_models';
import { AuthValidators } from '../auth-valdators';

@Component({
  selector: 'app-auth-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent {
  form: FormGroup;
  errors: any;

  status: XStatus = XStatus.Ready;
  XStatus = XStatus;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, AuthValidators.emailValidator]],
    });
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.status = XStatus.Clicked;

    // Reset alerts on submit
    this.alertService.clear();

    // Stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    const data: { email: string } = { email: this.f.email.value };

    this.status = XStatus.Sent;

    this.authService.forgot(data).subscribe({
      next: res => {
        this.status = XStatus.Succeed;
        this.alertService.success(res.message, true);
        this.router.navigate(['/home']);
      },
      error: err => {
        this.status = XStatus.Failed;
        this.errors = err;
      },
    });
  }
}
