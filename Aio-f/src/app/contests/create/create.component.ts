import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContestsService } from '../contests.service';
import {
  NgbDateStruct,
  NgbCalendar,
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
  start_time: string;
  end_time: string;

  form: FormGroup;
  is_visible: boolean;
  rule_type: string;

  status: XStatus = XStatus.Ready;
  XStatus = XStatus;
  envs = environment;

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
      month: currentDate.getMonth() + 1, // January is 0, so we add 1
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
        this.validator.checkTitle.bind(this.validator, 'contests.title'),
      ],
      description: [
        '',
        this.validator.checkContent.bind(
          this.validator,
          'contests.description'
        ),
      ],
      password: [
        '',
        this.validator.checkTitle.bind(this.validator, 'contests.password'),
      ],
      start_d: [
        defaultDate,
        this.validator.checkTitle.bind(this.validator, 'contests.startTime'),
      ],
      start_t: [
        defaultTime,
        this.validator.checkTitle.bind(this.validator, 'contests.startTime'),
      ],
      end_d: [
        defaultDate,
        this.validator.checkTitle.bind(this.validator, 'contests.endTime'),
      ],
      end_t: [
        defaultTime,
        this.validator.checkTitle.bind(this.validator, 'contests.endTime'),
      ],
    });
    this.is_visible = false;
    this.rule_type = 'acm';
  }

  get f() {
    return this.form.controls;
  }

  checkTime() {
    const start_time = new Date(
      this.f.start_d.value.year,
      this.f.start_d.value.month - 1,
      this.f.start_d.value.day,
      this.f.start_t.value.hour,
      this.f.start_t.value.minute
    );
    const end_time = new Date(
      this.f.end_d.value.year,
      this.f.end_d.value.month - 1,
      this.f.end_d.value.day,
      this.f.end_t.value.hour,
      this.f.end_t.value.minute
    );
    // Check if start time is earlier than end time
    if (start_time > end_time) {
      this.alertService.error('errors.endTime');
      return;
    }
  }

  onSubmit(): void {
    this.checkTime();
    this.status = XStatus.Clicked;

    // Reset alerts on submit
    this.alertService.clear();

    // Stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    let data: any = this.form;
    data.rule_type = this.rule_type;
    data.is_visible = this.is_visible;
    data.start_time = new Date();
    data.end_time = new Date();

    this.contestsService.createContests(data).subscribe({
      next: res => {
        console.log('success');
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

  //rule
  selectRule(rule: any) {
    this.rule_type = rule;
  }

  //visible
  selectVisible(visible: boolean) {
    this.is_visible = visible;
  }

  onInputClick() {
    this.f.start_d.markAsUntouched();
  }

  onInputBlur() {
    this.f.start_d.markAsTouched();
  }
}
