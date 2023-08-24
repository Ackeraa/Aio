import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProblemSetsService } from '../problem-sets.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ValidatorService } from '../../helpers';
import { AlertService, XStatus } from '../../shared';

@Component({
  selector: 'app-problem-sets-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.scss'],
})
export class CreateUpdateComponent {
  form: FormGroup;
  id: number;
  isCreate: boolean;

  status: XStatus = XStatus.Ready;
  XStatus = XStatus;
  envs = environment;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private problemSetsService: ProblemSetsService,
    private alertService: AlertService,
    private validator: ValidatorService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.isCreate = !this.id;

    this.createForm();

    if (!this.isCreate) {
      this.updateForm();
    }
  }

  createForm(): void {
    this.form = this.fb.group({
      name: [
        '',
        this.validator.checkTitle.bind(
          this.validator,
          'problemSets.name',
          true
        ),
      ],
      description: [
        '',
        this.validator.checkContent.bind(
          this.validator,
          'problemSets.description',
          true
        ),
      ],
    });
  }

  updateForm(): void {
    this.problemSetsService.getProblemSet(this.id).subscribe({
      next: data => {
        this.form.patchValue(data);
      },
      error: err => {
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

    const problemSet = {
      name: this.f.name.value,
      description: this.f.description.value,
    };

    this.status = XStatus.Sent;
    if (this.isCreate) {
      this.createProblemSet(problemSet);
    } else {
      this.updateProblemSet(problemSet);
    }
  }

  createProblemSet(problemSet: any) {
    this.problemSetsService.createProblemSet(problemSet).subscribe({
      next: data => {
        this.status = XStatus.Succeed;
        this.alertService.success('alerts.createSucceed');
        this.router.navigate(['/problem-set', data.id]);
      },
      error: err => {
        this.status = XStatus.Failed;
        this.alertService.error(err);
      },
    });
  }

  updateProblemSet(problemSet: any) {
    this.problemSetsService.updateProblemSet(this.id, problemSet).subscribe({
      next: data => {
        this.status = XStatus.Succeed;
        this.alertService.success('alerts.updateSucceed');
        this.router.navigate(['/problem-set', data.id]);
      },
      error: err => {
        this.status = XStatus.Failed;
        this.alertService.error(err);
      },
    });
  }
}
