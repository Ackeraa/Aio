import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject, BehaviorSubject, Observable, combineLatest, interval } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators'; 
import { ContestService } from './contest.service';

@Component({
	selector: 'app-contest',
	templateUrl: './contest.component.html',
	styleUrls: ['./contest.component.scss']
})
export class ContestComponent implements OnInit {

	color: string = 'bg-success';
	progress: number = 0;
	clock: any;
	start_time: number;
	end_time: number;
	intervalTimer: any;
	subscription: any;

	constructor(private route: ActivatedRoute,
			    private contestService: ContestService) {
	}
	ngOnInit(): void {

		this.intervalTimer = interval(1000);

		let id = this.route.snapshot.paramMap.get("id");
		this.contestService.getData(id);
		this.contestService.contest$
		.pipe(filter(x => x != null))
		.subscribe(contest => {
			this.start_time = new Date(contest.start_time).getTime();
			this.end_time = new Date(contest.end_time).getTime();
			let now = Date.now();
			if (now >= this.start_time) {
				this.subscription = this.intervalTimer
				.subscribe(() => {
					let now = Date.now();
					this.progress = (now - this.start_time) /
									(this.end_time - this.start_time) * 100;
					if (this.progress > 50) {
						this.color = 'bg-warning';
					}
					if (now >= this.end_time) {
						this.subscription.unsubscribe();
						this.color = 'bg-danger';
					}
				});
			}
		});
	}

}
