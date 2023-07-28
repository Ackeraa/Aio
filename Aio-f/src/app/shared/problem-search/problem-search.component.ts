import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ProblemSearchService, ProblemSearchParams } from '../';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-problem-search',
  templateUrl: './problem-search.component.html',
  styleUrls: ['./problem-search.component.scss'],
})
export class ProblemSearchComponent implements AfterViewInit {
  sources: Array<string>;

  @Output() searchEvent = new EventEmitter<any>();
  @Output() spideEvent = new EventEmitter<any>();
  @ViewChild('query', { static: true }) query: ElementRef;
  @ViewChild('source', { static: true }) source: ElementRef;

  private query$: Subscription;
  private source$: Subscription;

  constructor(private searchService: ProblemSearchService) {}

  ngAfterViewInit(): void {
    this.source.nativeElement.value = this.searchService.getSource();
    this.query.nativeElement.value = this.searchService.getQuery();
  }

  ngOnInit(): void {
    this.sources = environment.vproblemsSources;

    //Observer of source change.
    this.source$ = fromEvent(this.source.nativeElement, 'change').subscribe({
      next: (event: Event) => this.onSourceChange(event),
    });

    //Observer of query change.
    this.query$ = fromEvent(this.query.nativeElement, 'keyup')
      .pipe(debounceTime(300))
      .subscribe({
        next: (event: Event) => this.onQueryChange(event),
      });
  }

  onSourceChange(event: Event) {
    const params: ProblemSearchParams = {
      source: (event.target as HTMLInputElement).value,
      query: this.query.nativeElement.value,
      page: 1,
    };
    this.searchEvent.emit(params);
  }

  onQueryChange(event: Event) {
    const params: ProblemSearchParams = {
      source: this.source.nativeElement.value,
      query: (event.target as HTMLInputElement).value,
      page: 1,
    };
    this.searchEvent.emit(params);
  }

  spide(): void {
    this.query.nativeElement.value = '';
    this.spideEvent.emit(this.source.nativeElement.value);
  }

  ngOnDestroy(): void {
    this.query$.unsubscribe();
    this.source$.unsubscribe();
  }
}
