import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { faSpider } from '@fortawesome/free-solid-svg-icons';
import { map, debounceTime, tap, switchMap } from 'rxjs/operators';
import { ProblemSearchService } from '../../_services';
import { AlertService } from '../../_services';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-problem-search',
  templateUrl: './problem-search.component.html',
  styleUrls: ['./problem-search.component.scss'],
})
export class ProblemSearchComponent implements OnInit {
  sources: Array<string>;

  @Output() problemsEvent = new EventEmitter<any>();
  @Output() loadingEvent = new EventEmitter<boolean>();
  @ViewChild('query', { static: true }) query: ElementRef;
  @ViewChild('source', { static: true }) source: ElementRef;

  private query$: Subscription;
  private source$: Subscription;

  faSpider = faSpider;

  constructor(
    private searchService: ProblemSearchService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.onLoading(false);
    this.sources = environment.vproblemsSource;
    this.searchService
      .search(this.sources[0].toLowerCase(), '')
      .subscribe({
        next: (data) => this.problemsEvent.emit(data),
        error: (err) => this.alertService.error(err),
      });

    //Observer of source change.
    this.source$ = fromEvent(this.source.nativeElement, 'change')
      .pipe(
        map((e: any) => e.target.value.toLowerCase()),
        tap(() => this.onLoading(true)),
        switchMap((source: string) =>
          this.searchService.search(source, this.query.nativeElement.value)
        )
      )
      .subscribe({
        next: (data) => {
          this.problemsEvent.emit(data);
          this.onLoading(false);
        },
        error: (err) => {
          this.onLoading(false);
          this.alertService.error(err);
        },
      });

    //Observer of query change.
    this.query$ = fromEvent(this.query.nativeElement, 'keyup')
      .pipe(
        map((e: any) => e.target.value),
        debounceTime(300),
        tap(() => this.onLoading(true)),
        switchMap((query: string) =>
          this.searchService.search(
            this.source.nativeElement.value.toLowerCase(),
            query
          )
        )
      )
      .subscribe({
        next: (data) => {
          this.problemsEvent.emit(data);
          this.onLoading(false);
        },
        error: (err) => {
          this.onLoading(false);
          this.alertService.error(err);
        },
      });
  }

  private onLoading(status: boolean): void {
    this.loadingEvent.emit(status);
  }

  reSpide(): void {
    this.query.nativeElement.value = '';
    this.searchService
      .reSpide(this.source.nativeElement.value.toLowerCase)
      .subscribe({
        next: (data) => this.problemsEvent.emit(data),
        error: (err) => this.alertService.error(err),
      });
  }
  ngOnDestroy(): void {
    this.query$.unsubscribe();
    this.source$.unsubscribe();
  }
}
