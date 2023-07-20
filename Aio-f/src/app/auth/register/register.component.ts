import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { environment } from '../../../environments/environment';
import { AuthService, AlertService } from '../../_services';

@Component({
  selector: 'app-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  submitted: boolean;
  errors: any;

  envs = environment;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [
        '',
        [
          this.nameValidator,
          Validators.required,
          Validators.minLength(this.envs.unameMinLen),
          Validators.maxLength(this.envs.unameMaxLen),
        ],
      ],
      email: ['', [Validators.required, this.emailValidator]],
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

  nameValidator(name: FormControl): { [s: string]: boolean } {
    const regex = new RegExp(/^[a-zA-Z][a-zA-Z0-9_]*$/);
    if (!name.value.match(regex)) {
      return { invalidName: true };
    }
  }

  emailValidator(email: FormControl): { [s: string]: boolean } {
    const regex = new RegExp(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i);
    if (!email.value.match(regex)) {
      return { invalidEmail: true };
    }
  }

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

    const data: {
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

