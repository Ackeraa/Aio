import { Component, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ProblemsService } from '../problems.service';
import { ValidatorService } from '../../helpers';
import { CreateUpdateValidatorService } from './create-update-validator.service';
import { AlertService, XStatus } from '../../shared';
import { Problem } from '../';

@Component({
  selector: 'app-problems-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.scss'],
})
export class CreateUpdateComponent {
  form: FormGroup;
  id: string;
  isCreate: boolean;

  tags: Array<string>;
  languages: Array<any>;
  token: string;
  status: XStatus = XStatus.Ready;
  XStatus = XStatus;
  envs = environment;
  ruleTypes = this.envs.ruleTypes;
  allLanguages = this.envs.problemLanguages;
  allTags = this.envs.problemTags;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private alertService: AlertService,
    private problemsService: ProblemsService,
    private validator: ValidatorService,
    private createupdateValidator: CreateUpdateValidatorService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
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
        this.validator.checkTitle.bind(this.validator, 'problems.name', true),
      ],
      memoryLimit: [
        '',
        this.createupdateValidator.checkMemory.bind(this.createupdateValidator),
      ],
      timeLimit: [
        '',
        this.createupdateValidator.checkTime.bind(this.createupdateValidator),
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
      samples: this.fb.array([this.createSampleGroup()]),
      hint: [''],
      isVisible: [false],
      ruleType: [this.ruleTypes[0]],
    });

    this.tags = [];
    this.languages = this.allLanguages.slice();
  }

  updateForm(): void {
    this.problemsService.getProblem(this.id).subscribe((problem: Problem) => {
      this.form.patchValue(problem);
      this.tags = problem.tags;
      this.languages = problem.allowed_languages;
    });
  }

  get f() {
    return this.form.controls;
  }

  get sampleArray() {
    return this.form.get('samples') as FormArray;
  }

  createSampleGroup(): FormGroup {
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
    this.sampleArray.push(this.createSampleGroup());
  }

  removeSample(i: number): void {
    this.sampleArray.removeAt(i);
  }

  selectBtn(btn: any, element: string, elements: Array<string>) {
    let index = elements.indexOf(element);
    if (index == -1) {
      elements.push(element);
      this.renderer.removeClass(btn, 'btn-outline-dark');
      this.renderer.addClass(btn, 'btn-primary');
    } else {
      elements.splice(index, 1);
      this.renderer.removeClass(btn, 'btn-primary');
      this.renderer.addClass(btn, 'btn-outline-dark');
    }
  }

  selectTag(btn: any, tag: string) {
    this.selectBtn(btn, tag, this.tags);
  }

  selectLanguage(btn: any, language: string) {
    this.selectBtn(btn, language, this.languages);
  }

  onSubmit(): void {
    this.status = XStatus.Clicked;

    // Reset alerts on submit
    this.alertService.clear();

    // Stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    const problem: Problem = {
      name: this.f.name.value,
      description: this.f.description.value,
      source: 'aio',
      memory_limit: this.f.memoryLimit.value,
      time_limit: this.f.timeLimit.value,
      input: this.f.input.value,
      output: this.f.output.value,
      hint: this.f.hint.value,
      samples: this.f.samples.value,
      is_visible: this.f.isVisible.value,
      rule_type: this.f.ruleType.value,
      tags: this.tags,
      allowed_languages: this.languages,
    };

    this.status = XStatus.Sent;
    if (this.isCreate) {
      this.createProblem(problem);
    } else {
      this.updateProblem(problem);
    }
  }

  createProblem(problem: Problem): void {
    this.problemsService.createProblem(problem).subscribe({
      next: (id: number) => {
        this.status = XStatus.Succeed;
        //let url = '/problem/l/' + id + '/upload';
        //this.router.navigate([`/problem/l/${id}/upload`]);
      },
      error: (err: any) => {
        this.status = XStatus.Failed;
        this.alertService.error(err);
      },
    });
  }

  updateProblem(problem: Problem): void {
    this.problemsService.updateProblem(this.id, problem).subscribe({
      next: (id: number) => {
        this.status = XStatus.Succeed;
        //let url = '/problem/l/' + id + '/upload';
        //this.router.navigate([`/problem/l/${id}/upload`]);
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
