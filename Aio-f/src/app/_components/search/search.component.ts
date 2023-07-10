import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map, filter, debounceTime, tap, switchAll } from 'rxjs/operators'; 
import { SearchService } from '../../_services';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

	@Input() uri: string;
	@Input() addition: any = {};
	@Output() itemsEvent = new EventEmitter<any>();
	@Output() loadingEvent = new EventEmitter<boolean>();
	@ViewChild('query', { static: true }) query: ElementRef;

	constructor(private searchService: SearchService) {
	}

	ngOnInit(): void {
		this.loadingEvent.emit(false);
		this.searchService.search(this.uri, '', this.addition)
			.subscribe(data => this.itemsEvent.emit(data));

		//Observer of query change.
		fromEvent(this.query.nativeElement, 'keyup')
		.pipe(
			map((e: any) => e.target.value),
			debounceTime(300),
			tap(() => this.loadingEvent.emit(true)),
			map((query: string) => this.searchService.search(this.uri, query, this.addition)),
			switchAll()
		)
		.subscribe(
			(data: any) => {
				this.loadingEvent.emit(false);
				this.itemsEvent.emit(data);
			},
			(err: any) => {
				this.loadingEvent.emit(false);
				console.log(err);
			},
			() => {
				this.loadingEvent.emit(false);
			}
		);
	}
}
