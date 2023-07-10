import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Response } from '@angular/http';
import { map } from 'rxjs/operators'; 
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import {
	FormBuilder,
	FormGroup,
	FormArray,
	Validators,
	AbstractControl,
	FormControl
} from '@angular/forms';

const BASE_URL = 'http://127.0.0.1:3000';

@Component({
	selector: 'app-problems-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

	form: FormGroup;
	name: AbstractControl;
	memory_limit: AbstractControl;
	time_limit: AbstractControl;
	description: AbstractControl;
	input: AbstractControl;
	output: AbstractControl;
	samples: FormArray;
	hint: AbstractControl;
	all_tags: Array<string>;
	tags: Array<string>;
	rule_type: string;
	is_visible: boolean;
	languages: Array<string>;
	allowed_languages: Array<string>;
	token: string;

	private routeSub:any;

	constructor(private fb: FormBuilder, private renderer: Renderer2,
				private router: Router, private http: HttpClient) { 

	}
	ngOnInit(): void {
		this.form = this.fb.group({
			name: ['', Validators.compose([Validators.required,
										   Validators.maxLength(15)])],
			memory_limit: ['', Validators.compose([Validators.required,
												this.memoryValidator])],
			time_limit: ['', Validators.compose([Validators.required,
												this.timeValidator])],
			description:  ['', Validators.required],
			input:  ['', Validators.required],
			output:  ['', Validators.required],
			samples: this.fb.array([this.createSample()]),
			hint:  ['', Validators.required],
		});

		this.name = this.form.controls['name'];
		this.memory_limit = this.form.controls['memory_limit'];
		this.time_limit = this.form.controls['time_limit'];
		this.description = this.form.controls['description'];
		this.input = this.form.controls['input'];
		this.output = this.form.controls['output'];
		this.samples = this.form.get('samples') as FormArray;
		this.hint = this.form.controls['hint'];
		this.all_tags = ['DP', 'Greedy', 'DFS', 'BFS', 'Geometry', 'Brute Force'];
		this.tags = [];
		this.rule_type = 'acm';
		this.is_visible = null;
		this.languages = ['C', 'Cpp', 'Java', 'Python'];
		this.allowed_languages = ['C', 'Cpp', 'Java', 'Python'];
		this.token = '';

		this.samples.valueChanges.subscribe(
			(value: any) => {
			}
		);
	}
	// Validators for time_limit.
	timeValidator(time_limit: FormControl): {[s: string]: boolean} {
		if (!time_limit.value.match(/^[1-9]\d*$/)){
			return { invalidTimeLimit: true };
		}
	}

	// Validators for memory_limit.
	memoryValidator(memory_limit: FormControl): {[s: string]: boolean} {
		if (!memory_limit.value.match(/^[1-9]\d*$/)){
			return { invalidMemoryLimit: true };
		}
	}
	//Sample
	createSample(): FormGroup {
		return this.fb.group({
			sample_input: ['', Validators.required],
			sample_output: ['', Validators.required]
		});
	}
	addSample(): void {
		this.samples.push(this.createSample());
	}
	removeSample(i: number, sample: any): void {
		this.samples.removeAt(i);
		console.log(sample);
	}
	get sampleControls() {
		return this.form.get('samples')['controls'];
	}

	//Tag
	selectTag(btn: any, tag: string){
		console.log(btn.class);
		let index = this.tags.indexOf(tag);
		if (index == -1){
			this.tags.push(tag);
			this.renderer.removeClass(btn, 'btn-outline-dark');
			this.renderer.addClass(btn, 'btn-primary');
		} else {
			this.tags.splice(index, 1);
			this.renderer.removeClass(btn, 'btn-primary');
			this.renderer.addClass(btn, 'btn-outline-dark');
		}
	}
	//Rule
	selectRule(rule: any) {
		this.rule_type = rule;
	}
	//Visible
	selectVisible(visible: boolean) {
		this.is_visible = visible;
	}

	//Language
	selectLan(check: boolean, lan: string) {
		if (check) {
			this.allowed_languages.push(lan);
		} else {
			let index = this.allowed_languages.indexOf(lan);
			this.allowed_languages.splice(index, 1);
		}
	}
	//token
	setToken(token: string) {
		this.token = token;
	}

	onSubmit(form: any): void {
		if (this.token === '') {
			
		} else {
			let data: any = form
			data.allowed_languages = this.allowed_languages;
			data.tags = this.tags;
			data.token = this.token;
			data.is_visible = this.is_visible;
			data.rule_type = this.rule_type;
			this.http
				.post(
					BASE_URL + '/problems',
					data
				)
				.subscribe(data => {
					console.log(data)
				});
		}
	}

	ngOnDestroy() {
	}

}

