import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UserService } from '../user.service';
import { filter, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { XStatus, AlertService } from '../../shared';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  errors: any;
  status: XStatus = XStatus.Ready;
  XStatus = XStatus;
  baseUrl = environment.token_auth_config.apiBase;

  photo: FileUploader;
  maxFileSize = 5 * 1024 * 1024;
  photoPath: any;

  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.photoPath = `${this.baseUrl}/users/${this.userService.id}/get_photo`;

    this.photo = new FileUploader({
      url: `${this.baseUrl}/users/upload_photo`,
      itemAlias: 'photo',
    });
    this.photo.onBeforeUploadItem = item => {
      item.withCredentials = false;
    };
    this.photo.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('id', this.userService.id);
    };

    this.loading = true;
    this.userService.homeInfo$
      .pipe(
        filter(x => x != null),
        map(data => data.user),
      )
      .subscribe(user => {
        this.loading = false;
        this.form = this.formBuilder.group({
          name: [user.name],
          github: [user.github],
          real_name: [user.real_name],
          school: [user.school],
          major: [user.major],
          motto: [user.motto],
        });
      });
  }

  get f() {
    return this.form.controls;
  }

  imagePreview(e: any): void {
    const file = (e.target as HTMLInputElement).files[0];
    if (file.size > this.maxFileSize) {
      this.alertService.error('File size is too large, max size is 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.photoPath = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.status = XStatus.Clicked;

    // Reset alerts on submit
    this.alertService.clear();

    // Stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.alertService.clear();

    this.userService.changeGeneral(this.form.value).subscribe({
      next: () => {
        this.status = XStatus.Succeed;
        this.alertService.success('Information changed successfully');
        this.userService.getInfo();
        this.userService.updateUserName();
      },
      error: err => {
        this.status = XStatus.Failed;
        this.errors = err;
      },
    });
  }
}
