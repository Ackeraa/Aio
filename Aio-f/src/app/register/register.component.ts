import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { AuthService, AlertService } from '../_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  passwordConfirm: AbstractControl;

  loading: boolean;
  submitted: boolean;

  consts: { [s: string]: number };

  // Server side messages
  errors: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private translate: TranslateService,
  ) {
    this.consts = {
      unameMinLen: environment.unameMinLen,
      unameMaxLen: environment.unameMaxLen,
      passwdMinLen: environment.passwdMinLen,
      passwdMaxLen: environment.passwdMaxLen,
    };
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [
        '',
        [
          this.nameValidator,
          Validators.required,
          Validators.minLength(this.consts.unameMinLen),
          Validators.maxLength(this.consts.unameMaxLen),
        ],
      ],
      email: ['', [Validators.required, this.emailValidator]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(this.consts.passwdMinLen),
          Validators.maxLength(this.consts.passwdMaxLen),
        ],
      ],
      passwordConfirm: ['', Validators.required],
    });

  }

  // Validators for name.
  nameValidator(name: FormControl): { [s: string]: boolean } {
    let regex = new RegExp(/^[a-zA-Z][a-zA-Z0-9_]*$/);
    if (!name.value.match(regex)) {
      return { invalidName: true };
    }
  }

  // Validators for email.
  emailValidator(email: FormControl): { [s: string]: boolean } {
    let regex = new RegExp(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i);
    if (!email.value.match(regex)) {
      return { invalidEmail: true };
    }
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // Reset alerts on submit
    this.alertService.clear();

    // Stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    let data: {
      name: string;
      login: string;
      password: string;
      passwordConfirmation: string;
    } = {
      name: this.f.name.value,
      login: this.f.email.value,
      password: this.f.password.value,
      passwordConfirmation: this.f.passwordConfirm.value,
    };
    this.authService.register(data);
    this.authService.errors$.subscribe((data) => {
      if (data) {
        this.errors = data;
        this.loading = false;
      } else {
        this.alertService.success(
          'Registration successful, Please confirm your email before login.',
          true
        );
        this.router.navigate(['/login']);
      }
    });
  }
}

