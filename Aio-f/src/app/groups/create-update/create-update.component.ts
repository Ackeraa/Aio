import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GroupsService } from '../groups.service';
import { environment } from 'src/environments/environment';
import { ValidatorService } from '../../helpers';
import { AlertService, XStatus } from '../../shared';

@Component({
  selector: 'app-my-groups-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.scss']
})
export class CreateUpdateComponent {
  form: FormGroup;
  id: number;
  isAdd: boolean;

  status: XStatus = XStatus.Ready;
  XStatus = XStatus;
  envs = environment;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private groupsService: GroupsService,
    private alertService: AlertService,
    private validator: ValidatorService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.isAdd = !this.id;

    this.createForm();

    if (!this.isAdd) {
      this.updateForm();
    }
  }

  createForm(): void {
    this.form = this.fb.group({
      name: [
        '',
        this.validator.checkTitle.bind(
          this.validator,
          'groups.name',
          true
        ),
      ],
      description: [
        '',
        this.validator.checkContent.bind(
          this.validator,
          'groups.description',
          true
        ),
      ],
    });
  }

  updateForm(): void {
    this.groupsService.getGroup(this.id).subscribe({
      next: (data) => {
        this.form.patchValue(data);
      },
      error: (err) => {
        this.alertService.error(err);
      },
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.status = XStatus.Clicked;

    // Stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    const group = {
      name: this.f.name.value,
      description: this.f.description.value,
    };

    this.status = XStatus.Sent;
    if (this.isAdd) {
      this.createGroup(group);
    } else {
      this.updateGroup(group);
    }

  }

  createGroup(group: any) {
    this.groupsService.createGroup(group).subscribe({
      next: (data) => {
        this.status = XStatus.Succeed;
        this.alertService.success('alerts.createSucceed');
        this.router.navigate(['/group', data.id]);
      },
      error: (err) => {
        this.status = XStatus.Failed;
        this.alertService.error(err);
      },
    });
  }

  updateGroup(group: any) {
    this.groupsService.updateGroup(this.id, group).subscribe({
      next: (data) => {
        this.status = XStatus.Succeed;
        this.alertService.success('alerts.updateSucceed');
        this.router.navigate(['/group', data.id]);
      },
      error: (err) => {
        this.status = XStatus.Failed;
        this.alertService.error(err);
      },
    });
  }


}
