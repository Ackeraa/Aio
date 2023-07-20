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

@Component({
  selector: 'app-auth-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  submitted: boolean;
  returnUrl: string;
  errors: any;

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

    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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

    const data: { login: string, password: string } = {
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
