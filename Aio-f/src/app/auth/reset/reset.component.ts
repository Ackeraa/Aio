import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, AuthValidators } from '../';
import { environment } from 'src/environments/environment';
import { XStatus, AlertService } from '../../shared';

@Component({
  selector: 'app-auth-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent {
  form: FormGroup;
  errors: any;

  status: XStatus = XStatus.Ready;
  XStatus = XStatus;
  envs = environment;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: ['', AuthValidators.passwordValidator],
      passwordConfirm: ['', Validators.required],
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

    const data: { password: string; passwordConfirmation: string } = {
      password: this.f.password.value,
      passwordConfirmation: this.f.passwordConfirm.value,
    };
    const token = {
      accessToken: this.route.snapshot.queryParams['access-token'],
      client: this.route.snapshot.queryParams['client'],
      uid: this.route.snapshot.queryParams['uid'],
      expiry: this.route.snapshot.queryParams['expiry'],
    };

    this.status = XStatus.Sent;

    this.authService.reset(data, token).subscribe({
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
