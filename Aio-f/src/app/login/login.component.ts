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

  // Server side messages
  errors: any;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private authService: AuthService,
              private translate: TranslateService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name_email: ['', Validators.required],
      password: ['', Validators.required]
    });

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

    let data: { login: string, password: string } = {
      login: this.f.name_email.value,
      password: this.f.password.value
    };

    this.authService.login(data);
    this.authService.errors$.subscribe(data => {
      if (data === null) {
        this.router.navigate([this.returnUrl]);
      } else {
        this.errors = data;
        this.loading = false;
      }
    });
  }
}
