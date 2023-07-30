import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AlertService } from '../../shared';
import {
	FormBuilder,
	FormGroup,
	Validators,
	FormControl,
	AbstractControl
} from '@angular/forms';

@Component({
	selector: 'app-user-password-settings',
	templateUrl: './password-settings.component.html',
	styleUrls: ['./password-settings.component.scss']
})
export class PasswordSettingsComponent implements OnInit {

	form: FormGroup;
	password: AbstractControl;
	passwordCurrent: AbstractControl;
	passwordConfirmation: AbstractControl;

	loading = false;
	submitted = false;

	constructor(private formBuilder: FormBuilder,
				private userService: UserService,
				private alertService: AlertService) {
	}

	ngOnInit() {
		this.form = this.formBuilder.group({
			 password: ['', Validators.required],
			 passwordCurrent: ['', [Validators.required,
				 Validators.minLength(6),
				 Validators.maxLength(16)]],
			 passwordConfirmation: ['', Validators.required]
		});
		this.passwordCurrent = this.form.controls['passwordCurrent'];
		this.password = this.form.controls['password'];
		this.passwordConfirmation = this.form.controls['passwordConfirmation'];
	}

	confirmValidator(confirm_pwd: FormControl): {[s: string]: boolean} {
		let pwd = this.form.get('password').value;
		if (!confirm_pwd.value === pwd){
			return { invalidConfirm: true };
		}
	}

	get f() { return this.form.controls; }

	onSubmit() {
		this.submitted = true;
		if (this.form.invalid) {
			return;
		}

		this.alertService.clear();
		this.loading = true;

		this.userService.changePassword(this.form.value)
			.subscribe(
				data => {
					this.loading = false;
					this.alertService.success('Password changed successfully');
					this.submitted = false;
					this.form.reset();
				},
				err => {
					this.loading = false;
					this.alertService.error('Invalid password');
					console.log(err);
				});
	}
}
