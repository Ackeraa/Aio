import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl
} from '@angular/forms';
import { first } from 'rxjs/operators';

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

  loading = false;
  submitted = false;
  returnUrl: string;
  errors: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private authService: AuthService) {

    this.form = this.formBuilder.group({
      name_email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.name_email = this.form.controls['name_email'];
    this.password = this.form.controls['password'];

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
    this.errors = "";

    let data = {login: this.name_email.value, password: this.password.value};

    this.authService.logIn(data);
    this.authService.user$.subscribe(
      user => {
        if (user) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.authService.errors$.subscribe(
            errors => {
              if (errors && errors.join(" ").indexOf("Invalid") != -1) {
                this.errors = "Invalid user name or password.";
              } else {
                this.errors = "Please confirm your email before login.";
              }
              this.loading = false;
            }
          );
        }
      }
    );
  }

  ngOnInit() {
  }
}
