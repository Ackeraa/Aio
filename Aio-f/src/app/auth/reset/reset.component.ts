import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl
} from '@angular/forms';
import { AlertService, AuthService } from '../../_services';
import { environment } from '../../../environments/environment';
import { XStatus } from '../../_models';

@Component({
  selector: 'app-auth-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  form: FormGroup;
  errors: any;

  status: XStatus = XStatus.Ready;
  XStatus = XStatus;
  envs = environment;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private authService: AuthService,
              private translate: TranslateService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(this.envs.passwdMinLen),
          Validators.maxLength(this.envs.passwdMaxLen),
        ],
      ],
      passwordConfirm: ['', Validators.required],
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.status = XStatus.Clicked;

    // Reset alerts on submit
    this.alertService.clear();

    // Stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    const data: { password: string, passwordConfirmation: string } = {
      password: this.f.password.value,
      passwordConfirmation: this.f.passwordConfirm.value
    };
    const token = {
      accessToken: this.route.snapshot.queryParams['access-token'],
      client: this.route.snapshot.queryParams['client'],
      uid: this.route.snapshot.queryParams['uid'],
      expiry: this.route.snapshot.queryParams['expiry'],
    };

    this.status = XStatus.Sent;

    this.authService.reset(data, token).subscribe(
      res => {
        this.status = XStatus.Received;
        this.router.navigate(['/auth/login']);
      },
      err => {
        console.log(err);
        this.errors = err;
        this.status = XStatus.Received;
      }
    );
  }
}
