import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ProblemSetsService } from '../problem-sets.service';
import {
	FormBuilder,
	FormGroup,
	FormArray,
	Validators,
	AbstractControl,
	FormControl
} from '@angular/forms';

@Component({
	selector: 'app-problem-sets-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
	form: FormGroup;
	title: AbstractControl;
	description: AbstractControl;

	constructor(private router: Router,
				private fb: FormBuilder,
			    private problemSetsService: ProblemSetsService) {
	}

	ngOnInit(): void {
		this.form = this.fb.group({
			title: ['', Validators.required],
			description: ['', Validators.required],
		});

		this.title = this.form.controls['title'];
		this.description = this.form.controls['description']; 
	}

	onSubmit(form: any) {
		this.problemSetsService.create(form);
	}
}


