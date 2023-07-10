import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators'; 
import { UserService } from '../user.service';

@Component({
	selector: 'app-user-problems',
	templateUrl: './problems.component.html',
	styleUrls: ['./problems.component.scss']
})
export class ProblemsComponent implements OnInit {

	classifiedProblems: Array<any>;

	constructor(private userService: UserService) { }

	ngOnInit(): void {
		this.userService.problems$
			.pipe(filter(x => x != null))
			.subscribe(problems => {
				let classify = {};
				problems.forEach(problem => {
					if (classify.hasOwnProperty(problem.source)) {
						classify[problem.source].push(problem.id);
					} else {
						classify[problem.source] = [problem.id];
					}
				});
				this.classifiedProblems = [];
				for (const key in classify) {
					let obj = { source: key, problems: classify[key]};
					this.classifiedProblems.push(obj);
				}
			});
	}
}
