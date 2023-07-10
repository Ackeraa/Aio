import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContestService } from '../contest.service';
import { filter } from 'rxjs/operators'; 

@Component({
	selector: 'app-contest-submit',
	templateUrl: './submit.component.html',
	styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit {

	code: any;
	has_code: boolean;
	options: any;
	modes: Array<string>;
	languages: Array<any>;
	problems: Array<any>;
	language: string; 
	themes: Array<string>;
	problem: number;

	constructor(private router: Router,
				private route: ActivatedRoute,
				private contestService: ContestService) {
	}

	ngOnInit(): void {
		this.problems = [];
		this.contestService.problems$.pipe(filter(x => x != null))
			.subscribe(problems => {
				this.problems = problems;
				this.languages = problems[0].allowed_languages;
				this.language = this.languages[0].id;
			});

		this.problem = 0;

		this.has_code = true;
		this.options = {
			tabSize: 4,
			smartIndent: true,
			indentWithTabs: true,
			lineNumbers: true,
			lineWrapping: true,
			theme: 'dracula',
			mode: 'clike'
		}
		this.modes = ['clike', 'clike', 'javascript', 'python'];
		this.themes = ['Dracula', 'Eclipse', 'Idea']; 
		this.code = '';
	}

	submit(): void {
		if (this.code == '') {
			this.has_code = false;
		} else {
			this.has_code = true;
			this.contestService.submitProblem(this.problem, this.language, this.code)
				.subscribe(() => 
					this.router.navigate(['../my-submissions'], { relativeTo: this.route })
				);
		}
	}

	selectProblem(id: number): void {
		this.languages = this.problems[id].allowed_languages;
		this.problem = id;
	}

	selectLanguage(id: any): void {
		this.language = this.languages[id].id;
		this.options.mode = this.modes[id];
	}

	selectTheme(id: any): void {
		this.options.theme = this.themes[id].toLowerCase();
	}

	clearCode(): void {
		this.code = '';
	}

	loadCode(file: any): void {
		let reader = new FileReader();
		reader.onload = (fileLoadedEvent) => {
			this.code = fileLoadedEvent.target.result;
		};
		reader.readAsText(file, 'UTF-8');
	}
}
