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
  email: AbstractControl; 
  password: AbstractControl;
  password_confirmation: AbstractControl;

  loading = false;
  submitted = false;
  email_exists = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    // Redirect to home if already logged in.
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, this.emailValidator])],
      password: ['', [Validators.required, Validators.minLength(6),
        Validators.maxLength(16)]],
        password_confirmation: ['', Validators.required],
    });
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.password_confirmation = this.form.controls['password_confirmation'];
  }

  // Validators for email.
  emailValidator(email: FormControl): {[s: string]: boolean} {
    let regex = new RegExp(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i);
    if (!email.value.match(regex)){
      return { invalidEmail: true };
    }
  }

  // Validators for confirm_password.
  confirmValidator(confirm_pwd: FormControl): {[s: string]: boolean} {
    let pwd = this.form.get('password').value;
    if (!confirm_pwd.value === pwd){
      return { invalidConfirm: true };
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
    this.email_exists = false;

    let data = {login: this.email.value, password: this.password.value, name: "test"};
    this.authService.register(data);
    this.authService.errors$
      .pipe(
        filter(errors => !!errors),
        tap(errors => {
          // FIXME: This is not working.
          if (errors.email) {
            this.email_exists = true;
          }
          this.loading = false;
        })
      )
      .subscribe(() => {
        this.alertService.success('Registration successful, Please confirm your\
                                  emali before login.', true);
        this.router.navigate(['/login']);
      });

    /*
    this.authService.errors$.subscribe(
      errors => {
        if (errors) {
          if (errors.email) {
            this.email_exists = true;
          }
          this.loading = false;
        } else {
          this.alertService.success('Registration successful, Please confirm your\
                                    emali before login.', true);
          this.router.navigate(['/login']);
        }
      }
    );
    */
  }
}
