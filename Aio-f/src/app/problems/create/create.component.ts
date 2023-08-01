import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ProblemsService } from '../problems.service';
import { ValidatorService } from '../../helpers';
import { CreateValidatorService } from './create-validator.service';
import { AlertService, XStatus } from '../../shared';

@Component({
  selector: 'app-problems-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  samples: FormArray;
  all_tags: Array<string>;
  tags: Array<string>;
  rule_type: string;
  is_visible: boolean;
  languages: Array<any>;
  allowed_languages: Array<any>;

  token: string;

  status: XStatus = XStatus.Ready;
  XStatus = XStatus;
  envs = environment;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private alertService: AlertService,
    private problemsService: ProblemsService,
    private validator: ValidatorService,
    private createValidator: CreateValidatorService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [
        '',
        this.validator.checkTitle.bind(this.validator, 'problems.name', true),
      ],
      memory_limit: [
        '',
        this.createValidator.checkMemory.bind(this.createValidator),
      ],
      time_limit: [
        '',
        this.createValidator.checkTime.bind(this.createValidator),
      ],
      description: [
        '',
        this.validator.checkContent.bind(
          this.validator,
          'problems.description',
          true
        ),
      ],
      input: [
        '',
        this.validator.checkContent.bind(
          this.validator,
          'problems.input',
          true
        ),
      ],
      output: [
        '',
        this.validator.checkContent.bind(
          this.validator,
          'problems.output',
          true
        ),
      ],
      samples: this.fb.array([this.createSample()]),
      hint: [''],
    });

    this.samples = this.form.get('samples') as FormArray;
    this.all_tags = ['DP', 'Greedy', 'DFS', 'BFS', 'Geometry', 'Brute Force'];
    this.tags = [];
    this.rule_type = 'acm';
    this.is_visible = null;
    this.languages = [
      { id: 0, value: 'C' },
      { id: 1, value: 'Cpp' },
      { id: 2, value: 'Java' },
      { id: 3, value: 'Python' },
    ];
    this.allowed_languages = Array.from(this.languages);
  }

  get f() {
    return this.form.controls;
  }

  get sampleControls() {
    return this.form.get('samples')['controls'];
  }

  createSample(): FormGroup {
    return this.fb.group({
      sample_input: [
        '',
        this.validator.checkContent.bind(
          this.validator,
          'problems.sampleInput',
          true
        ),
      ],
      sample_output: [
        '',
        this.validator.checkContent.bind(
          this.validator,
          'problems.sampleOutput',
          true
        ),
      ],
    });
  }

  addSample(): void {
    this.samples.push(this.createSample());
  }

  removeSample(i: number, sample: any): void {
    this.samples.removeAt(i);
  }

  selectTag(btn: any, tag: string) {
    let index = this.tags.indexOf(tag);
    if (index == -1) {
      this.tags.push(tag);
      this.renderer.removeClass(btn, 'btn-outline-dark');
      this.renderer.addClass(btn, 'btn-primary');
    } else {
      this.tags.splice(index, 1);
      this.renderer.removeClass(btn, 'btn-primary');
      this.renderer.addClass(btn, 'btn-outline-dark');
    }
  }

  selectRule(rule: any) {
    this.rule_type = rule;
    console.log(this.f.memory_limit.errors.required);
  }

  selectVisible(visible: boolean) {
    this.is_visible = visible;
  }

  selectLan(check: boolean, lan: string) {
    if (check) {
      this.allowed_languages.push(lan);
    } else {
      let index = this.allowed_languages.indexOf(lan);
      this.allowed_languages.splice(index, 1);
    }
  }

  onSubmit(): void {
    this.status = XStatus.Clicked;

    // Reset alerts on submit
    this.alertService.clear();

    // Stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    let data: any = this.form.value;
    data.allowed_languages = this.allowed_languages;
    data.tags = this.tags;
    data.is_visible = this.is_visible;
    data.rule_type = this.rule_type;
    data.source = 'aio';
    this.problemsService.createProblem(data).subscribe({
      next: (id: number) => {
        this.status = XStatus.Succeed;
        let url = '/problem/l/' + id + '/upload';
        this.router.navigate([url]);
      },
      error: (err: any) => {
        this.status = XStatus.Failed;
        this.alertService.error(err);
      },
    });
  }

  setToken(token: string) {
    this.token = token;
  }

  ngOnDestroy() {}
}
