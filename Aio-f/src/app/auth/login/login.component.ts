import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService, AuthValidators } from '../';
import { AlertService, XStatus } from '../../shared';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  returnUrl: string;
  errors: any;

  status: XStatus = XStatus.Ready;
  XStatus = XStatus;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name_email: ['', AuthValidators.emailValidator],
      password: ['', AuthValidators.passwordValidator],
    });

    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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

    const data: { login: string; password: string } = {
      login: this.f.name_email.value,
      password: this.f.password.value,
    };

    this.status = XStatus.Sent;

    this.authService.login(data).subscribe({
      next: () => {
        this.status = XStatus.Succeed;
        this.router.navigate([this.returnUrl]);
      },
      error: err => {
        this.status = XStatus.Failed;
        this.errors = err;
      },
    });
  }
}
