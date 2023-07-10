import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators'; 
import { ContestService } from '../contest.service';

@Component({
	selector: 'app-contest-ranks',
	templateUrl: './ranks.component.html',
	styleUrls: ['./ranks.component.scss']
})
export class RanksComponent implements OnInit {

	receiver: Subscription;
	ranks: Array<any>;
	problems: Array<any>;

	constructor(private contestService: ContestService) {
	}

	ngOnInit(): void {
		this.contestService.problems$
			.pipe(filter(x => x != null))
			.subscribe(problems => {
				this.problems = Array.from(Array(problems.length))
					.map((e, i) => i + 65)
					.map((x) => String.fromCharCode(x));
			});

		this.contestService.getRanks()
			.subscribe(ranks => {
				this.ranks = ranks;
				console.log(ranks);
			});
		//only receive.
		this.receiver = this.contestService.getRanksChannel()
			.pipe(filter(x => x != null))
			.subscribe(rank => {
				let i = this.ranks.findIndex(x => x.user_id === rank.user_id);
				if (i == -1) {
					this.ranks.push(rank);
				} else {
					this.ranks[i] = rank;
				}
				this.ranks.sort((a, b) => {
					if (a.accepts < b.accepts) {
						return 1;
					}
					if (a.accepts > b.accepts) {
						return -1;
					}
					return a.time - b.time;
				});
				console.log(rank);
			});
	}

	ngOnDestroy(): void {
		this.receiver.unsubscribe();
	}

}
