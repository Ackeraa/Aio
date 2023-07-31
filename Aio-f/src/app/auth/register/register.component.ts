import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthService, AuthValidatorService } from '../';
import { XStatus, AlertService } from '../../shared';

@Component({
  selector: 'app-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: FormGroup;
  errors: any;
  status: XStatus = XStatus.Ready;
  XStatus = XStatus;
  envs = environment;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private authValidator: AuthValidatorService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', this.authValidator.checkName.bind(this.authValidator)],
      email: ['', this.authValidator.checkEmail.bind(this.authValidator)],
      password: ['', this.authValidator.checkPassword.bind(this.authValidator)],
      passwordConfirm: ['', Validators.required],
    });
  }

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

    const data: {
      name: string;
      login: string;
      password: string;
      passwordConfirmation: string;
    } = {
      name: this.f.name.value,
      login: this.f.email.value,
      password: this.f.password.value,
      passwordConfirmation: this.f.passwordConfirm.value,
    };

    this.status = XStatus.Sent;

    this.authService.register(data).subscribe({
      next: res => {
        this.status = XStatus.Succeed;
        this.alertService.success(res.message, true);
        this.router.navigate(['/auth/login']);
      },
      error: err => {
        this.status = XStatus.Failed;
        this.errors = err;
      },
    });
  }
}
