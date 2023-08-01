import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContestsService } from '../contests.service';
import {
  NgbDateStruct,
  NgbTimepickerConfig,
  NgbTimeStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ValidatorService } from '../../helpers';
import { XStatus, AlertService } from '../../shared';

@Component({
  selector: 'app-contest-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  form: FormGroup;
  errors: any;
  status: XStatus = XStatus.Ready;
  XStatus = XStatus;
  envs = environment;
  ruleTypes = this.envs.ruleTypes;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private timeConfig: NgbTimepickerConfig,
    private contestsService: ContestsService,
    private validator: ValidatorService,
    private alertService: AlertService
  ) {
    this.timeConfig.seconds = false;
    this.timeConfig.spinners = false;
  }

  ngOnInit(): void {
    const currentDate = new Date();
    const defaultDate: NgbDateStruct = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate(),
    };
    const defaultTime: NgbTimeStruct = {
      hour: currentDate.getHours(),
      minute: currentDate.getMinutes(),
      second: currentDate.getSeconds(),
    };
    this.form = this.fb.group({
      name: [
        '',
        this.validator.checkTitle.bind(this.validator, 'contests.name', true),
      ],
      description: [
        '',
        this.validator.checkContent.bind(
          this.validator,
          'contests.description',
          true
        ),
      ],
      isVisible: [false],
      ruleType: [this.ruleTypes[0]],
      password: [
        '',
        this.validator.checkTitle.bind(
          this.validator,
          'contests.password',
          false
        ),
      ],
      start_d: [defaultDate],
      start_t: [
        defaultTime,
        this.validator.checkTitle.bind(
          this.validator,
          'contests.startTime',
          true
        ),
      ],
      end_d: [defaultDate],
      end_t: [
        defaultTime,
        this.validator.checkTitle.bind(
          this.validator,
          'contests.endTime',
          true
        ),
      ],
    });
  }

  get f() {
    return this.form.controls;
  }

  getDateTime(date: NgbDateStruct, time: NgbTimeStruct): Date {
    return new Date(
      date.year,
      date.month - 1,
      date.day,
      time.hour,
      time.minute
    );
  }

  onSubmit(): void {
    this.status = XStatus.Clicked;

    // Reset alerts on submit
    this.alertService.clear();

    // Stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    // Check if start time is earlier than end time
    const startTime = this.getDateTime(
      this.f.start_d.value,
      this.f.start_t.value
    );
    const endTime = this.getDateTime(this.f.end_d.value, this.f.end_t.value);

    if (startTime > endTime) {
      this.errors = 'contests.tooEarly';
      return;
    }

    const data = {
      name: this.f.name.value,
      description: this.f.description.value,
      password: this.f.password.value,
      rule_type: this.f.ruleType.value.toLowerCase,
      is_visible: this.f.isVisible.value,
      start_time: startTime,
      end_time: endTime,
    };

    this.contestsService.createContest(data).subscribe({
      next: res => {
        this.status = XStatus.Succeed;
        this.alertService.success('ssssssssss', true);
        this.router.navigate(['/contest/' + res.id]);
      },
      error: err => {
        console.log(err);
        this.status = XStatus.Failed;
        // FIXME: This may not be the best way to handle errors
        this.alertService.error(err, true);
      },
    });
  }
}
