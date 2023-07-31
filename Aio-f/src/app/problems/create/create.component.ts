import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { ProblemsService } from '../problems.service';

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

  submitted: boolean;
  token: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private problemsService: ProblemsService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(15)]),
      ],
      memory_limit: [
        '',
        Validators.compose([Validators.required, this.memoryValidator]),
      ],
      time_limit: [
        '',
        Validators.compose([Validators.required, this.timeValidator]),
      ],
      description: ['', Validators.required],
      input: ['', Validators.required],
      output: ['', Validators.required],
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
    this.submitted = false;
  }

  timeValidator(time_limit: FormControl): { [s: string]: boolean } {
    if (!time_limit.value.match(/^[1-9]\d*$/)) {
      return { invalidTimeLimit: true };
    }
  }

  get f() {
    return this.form.controls;
  }

  memoryValidator(memory_limit: FormControl): { [s: string]: boolean } {
    if (!memory_limit.value.match(/^[1-9]\d*$/)) {
      return { invalidMemoryLimit: true };
    }
  }

  createSample(): FormGroup {
    return this.fb.group({
      sample_input: ['', Validators.required],
      sample_output: ['', Validators.required],
    });
  }

  addSample(): void {
    this.samples.push(this.createSample());
  }

  removeSample(i: number, sample: any): void {
    this.samples.removeAt(i);
  }

  get sampleControls() {
    return this.form.get('samples')['controls'];
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
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    let data: any = this.form.value;
    data.allowed_languages = this.allowed_languages;
    data.tags = this.tags;
    data.is_visible = this.is_visible;
    data.rule_type = this.rule_type;
    data.source = 'aio';
    this.problemsService.createProblem(data).subscribe(id => {
      let url = '/problem/l/' + id + '/upload';
      this.router.navigate([url]);
    });
  }

  setToken(token: string) {
    this.token = token;
  }

  ngOnDestroy() {}
}
