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
import { filter } from 'rxjs/operators';

import { AlertService, AuthService } from '../_services';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  form: FormGroup;
  email: AbstractControl;

  loading: boolean;
  submitted: boolean;
  returnUrl: string;

  login_k: string;
  email_k: string;
  password_reset_k: string;

  remembered_password: string;

  email_required: string;

  // error received from server
  error: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private authService: AuthService,
              private translate: TranslateService) {

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, this.emailValidator]],
    });

    this.email = this.form.controls['email'];

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // translate
    this.translate.get(['keywords', 'errors', 'infos']).subscribe(data => {
      this.login_k = data.keywords.login;
      this.email_k = data.keywords.email;
      this.password_reset_k = data.keywords.password_reset;

      this.remembered_password = data.infos.remembered_password;

      this.email_required = data.errors.required.replace('%s', this.email_k);
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  // Validators for email.
  emailValidator(email: FormControl): {[s: string]: boolean} {
    let regex = new RegExp(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i);
    if (!email.value.match(regex)){
      return { invalidEmail: true };
    }
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.error = "";
  }

  ngOnInit() {
  }
}
