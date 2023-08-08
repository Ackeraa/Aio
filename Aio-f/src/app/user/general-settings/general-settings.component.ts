import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UserService } from '../user.service';
import { filter, map } from 'rxjs/operators';
import { AlertService } from '../../shared';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';

const BASE_URL = 'http://39.106.54.201:3000';

@Component({
  selector: 'app-user-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss'],
})
export class GeneralSettingsComponent implements OnInit {
  photo: FileUploader;
  photoPath: any = 'http://39.106.54.201:3000/users/27/get_photo';

  form: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  github: AbstractControl;
  real_name: AbstractControl;
  school: AbstractControl;
  major: AbstractControl;
  motto: AbstractControl;

  loading: boolean;
  submitted: boolean;
  nameExists: boolean;
  emailExists: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.submitted = false;
    this.nameExists = false;
    this.emailExists = false;

    this.photo = new FileUploader({
      url: BASE_URL + '/users/upload_photo',
      itemAlias: 'photo',
    });
    this.photo.onBeforeUploadItem = item => {
      item.withCredentials = false;
    };
    this.photo.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('id', this.userService.id);
    };

    this.userService.homeInfo$
      .pipe(
        filter(x => x != null),
        map(data => data.user)
      )
      .subscribe(user => {
        this.form = this.formBuilder.group({
          img: [null],
          name: [
            user.name,
            Validators.compose([
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(10),
              this.nameValidator,
            ]),
          ],
          email: [
            user.email,
            Validators.compose([Validators.required, this.emailValidator]),
          ],
          github: [user.github],
          real_name: [user.real_name],
          school: [user.school],
          major: [user.major],
          motto: [user.motto],
        });
        this.name = this.form.controls['name'];
        this.email = this.form.controls['email'];
        this.github = this.form.controls['github'];
        this.real_name = this.form.controls['real_name'];
        this.school = this.form.controls['school'];
        this.major = this.form.controls['major'];
        this.motto = this.form.controls['motto'];
        this.loading = false;
      });
  }

  nameValidator(name: FormControl): { [s: string]: boolean } {
    if (!name.value.match(/^[A-Za-z]+[A-Za-z0-9_]+$/)) {
      return { invalidName: true };
    }
  }

  emailValidator(email: FormControl): { [s: string]: boolean } {
    let regex = new RegExp(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i);
    if (!email.value.match(regex)) {
      return { invalidEmail: true };
    }
  }

  imagePreview(e: any): void {
    const file = (e.target as HTMLInputElement).files[0];

    this.form.patchValue({
      img: file,
    });

    this.form.get('img').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.photoPath = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.alertService.clear();
    this.loading = true;
    this.nameExists = false;
    this.emailExists = false;

    this.userService.changeGeneral(this.form.value).subscribe(
      data => {
        this.loading = false;
        this.alertService.success('Information changed successfully');
        this.userService.getUser('');
        this.userService.updateUserName();
        this.submitted = false;
      },
      error => {
        let errors = error['_body'].errors;
        console.log(errors);
        if (errors.name) {
          this.nameExists = true;
          this.alertService.error('Name has already exists');
        }
        if (errors.email) {
          this.emailExists = true;
          this.alertService.error('Email has already exists');
        }
        this.loading = false;
      }
    );
  }
}
