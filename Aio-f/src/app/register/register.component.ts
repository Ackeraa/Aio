import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  // error received from server
  name_error: string;
  email_error: string;
  password_error: string;
  password_confirmation_error: string; // maybe not needed

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    // Redirect to home if already logged in.
    if (this.authService.isSignedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, this.nameValidator,
                  Validators.minLength(5), Validators.maxLength(10)]],
      email: ['', [Validators.required, this.emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6),
                      Validators.maxLength(16)]],
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
          this.name_error = data.name ? "Username " + data.name[0] : '';
          this.email_error = data.email ? "Email " + data.email[0] : '';
          this.password_error = data.password ? "Password " + data.password[0] : '';
          this.password_confirmation_error = data.password_confirmation ?
              "Password confirmation " + data.password_confirmation[0] : '';
          this.loading = false;
        } else {
          this.alertService.success('Registration successful, Please confirm your\
                                    email before login.', true);
          this.router.navigate(['/login']);
        }
    });
  }
}
