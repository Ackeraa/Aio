import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from "../../environments/environment";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl
} from '@angular/forms';
import { first, filter, tap } from 'rxjs/operators';

import { AlertService, AuthService } from '../_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  password_confirmation: AbstractControl;

  loading: boolean;
  submitted: boolean;

  // keywords for translation
  register_k: string;
  login_k: string;
  username_k: string;
  email_k: string;
  password_k: string;
  password_confirmation_k: string;

  already_have_account: string;

  // error received from client
  name_required: string;
  name_too_short: string;
  name_too_long: string;
  email_required: string;
  password_required: string;
  password_too_short: string;
  password_too_long: string;
  password_confirmation_required: string;
  password_mismatch: string;

  // error received from server
  name_error: string;
  email_error: string;
  password_error: string;
  password_confirmation_error: string; // maybe not needed

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private translate: TranslateService
  ) {

    this.translate.get(['keywords', 'errors', 'register', 'infos']).subscribe(data => {
      // get keywords for translation.
      this.register_k = data.keywords.register;
      this.login_k = data.keywords.login;
      this.username_k = data.keywords.username;
      this.email_k = data.keywords.email;
      this.password_k = data.keywords.password;
      this.password_confirmation_k = data.keywords.password_confirmation;

      this.already_have_account = data.infos.already_have_account;

      // get error messages for translation.
      this.name_required = data.errors.required
        .replace("%s", this.username_k);
      this.name_too_short = data.errors.too_short
        .replace("%s", this.username_k)
        .replace("%d", environment.unameMinLen);
      this.name_too_long = data.errors.too_long
        .replace("%s", this.username_k)
        .replace("%d", environment.unameMaxLen);

      this.email_required = data.errors.required
        .replace("%s", this.email_k);

      this.password_required = data.errors.required
        .replace("%s", this.password_k);
      this.password_too_short = data.errors.too_short
        .replace("%s", this.password_k)
        .replace("%d", environment.passwdMinLen);
      this.password_too_long = data.errors.too_long
        .replace("%s", this.password_k)
        .replace("%d", environment.passwdMaxLen);

      this.password_confirmation_required = data.errors.required
        .replace("%s", this.password_confirmation_k);
      this.password_mismatch = data.register.password_mismatch;
    });

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, this.nameValidator,
        Validators.minLength(environment.unameMinLen),
        Validators.maxLength(environment.unameMaxLen)]],
      email: ['', [Validators.required, this.emailValidator]],
      password: ['', [Validators.required,
        Validators.minLength(environment.passwdMinLen),
        Validators.maxLength(environment.passwdMaxLen)]],
      password_confirmation: ['', Validators.required],
    });
    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.password_confirmation = this.form.controls['password_confirmation'];

  }

  // Validators for name.
  nameValidator(name: FormControl): {[s: string]: boolean} {
    // start with a letter, allow letters, numbers, and underscores.
    let regex = new RegExp(/^[a-zA-Z][a-zA-Z0-9_]*$/);
    if (!name.value.match(regex)){
      return { invalidName: true };
    }
  }

  // Validators for email.
  emailValidator(email: FormControl): {[s: string]: boolean} {
    let regex = new RegExp(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i);
    if (!email.value.match(regex)){
      return { invalidEmail: true };
    }
  }

  // Convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // Reset alerts on submit
    this.alertService.clear();

    // Stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    let data = { name: this.name.value, login: this.email.value, password: this.password.value };
    this.authService.register(data);
    this.authService.errors$.subscribe(
      data => {
        if (data) {
          this.name_error = data.name ? data.name[0] : '';
          this.email_error = data.email ? data.email[0] : '';
          this.password_error = data.password ? data.password[0] : '';
          this.password_confirmation_error = data.password_confirmation ?  data.password_confirmation[0] : '';
          this.loading = false;
        } else {
          this.alertService.success('Registration successful, Please confirm your\
                                    email before login.', true);
          this.router.navigate(['/login']);
        }
    });
  }
}
