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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  name_email: AbstractControl;
  password: AbstractControl;

  loading: boolean;
  submitted: boolean;
  returnUrl: string;

  login_k: string;
  register_k: string;
  username_k: string;
  password_k: string;

  forgot_password: string;
  dont_have_account: string;

  name_required: string;
  password_required: string;

  // error received from server
  error: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private authService: AuthService,
              private translate: TranslateService) {

    this.form = this.formBuilder.group({
      name_email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.name_email = this.form.controls['name_email'];
    this.password = this.form.controls['password'];

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // translate
    this.translate.get(['keywords', 'errors', 'infos']).subscribe(data => {
      this.login_k = data.keywords.login;
      this.register_k = data.keywords.register;
      this.username_k = data.keywords.username;
      this.password_k = data.keywords.password;

      this.forgot_password = data.infos.forgot_password;
      this.dont_have_account = data.infos.dont_have_account;

      this.name_required = data.errors.required.replace('%s', this.username_k);
      this.password_required = data.errors.required.replace('%s', this.password_k);
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

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

    let data = {login: this.name_email.value, password: this.password.value};

    this.authService.login(data);
    this.authService.errors$.subscribe(data => {
      if (data === null) {
        this.router.navigate([this.returnUrl]);
      } else {
        this.error = data[0];
        this.loading = false;
      }
    });
  }

  ngOnInit() {
  }
}
