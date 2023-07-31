import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProblemSetsService } from '../problem-sets.service';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ValidatorService } from '../../helpers';
import { AlertService, XStatus } from '../../shared';

@Component({
  selector: 'app-problem-sets-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  form: FormGroup;

  status: XStatus = XStatus.Ready;
  XStatus = XStatus;
  envs = environment;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private problemSetsService: ProblemSetsService,
    private alertService: AlertService,
    private validator: ValidatorService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [
        '',
        this.validator.checkTitle.bind(this.validator, 'problemSets.title'),
      ],
      description: [
        '',
        this.validator.checkContent.bind(
          this.validator,
          'problemSets.description'
        ),
      ],
    });

  }

  get f() {
    return this.form.controls;
  }

  onSubmit(form: any) {
    this.status = XStatus.Clicked;

    // Stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.problemSetsService.create(form).subscribe({
      next: (data) => {
        this.status = XStatus.Succeed;
        this.alertService.success('alerts.createSucceed');
        this.router.navigate(['/problem-sets', data.id]);
      },
      error: (err) => {
        this.status = XStatus.Failed;
        this.alertService.error(err);
      }
    });
  }
}
