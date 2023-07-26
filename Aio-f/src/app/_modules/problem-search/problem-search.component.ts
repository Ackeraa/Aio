import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { faSpider } from '@fortawesome/free-solid-svg-icons';
import { map, debounceTime, tap, switchMap } from 'rxjs/operators';
import { ProblemSearchService } from '../';
import { AlertService } from '../../_services';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-problem-search',
  templateUrl: './problem-search.component.html',
  styleUrls: ['./problem-search.component.scss'],
})
export class ProblemSearchComponent implements AfterViewInit {
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

  ngAfterViewInit(): void {
    this.source.nativeElement.value =
      this.searchService.getSource() || this.sources[0];
    this.query.nativeElement.value = this.searchService.getQuery() || '';

    this.searchService.get({}).subscribe({
      next: data => this.problemsEvent.emit(data),
      error: err => this.alertService.error(err),
    });
  }

  ngOnInit(): void {
    this.setLoading(false);
    this.sources = environment.vproblemsSources;

    //Observer of source change.
    this.source$ = fromEvent(this.source.nativeElement, 'change')
      .pipe(
        map((e: any) => e.target.value),
        tap(() => this.setLoading(true)),
        switchMap((source: string) => {
          return this.searchService.get({
            source: source,
            query: this.query.nativeElement.value,
          });
        })
      )
      .subscribe({
        next: data => {
          this.problemsEvent.emit(data);
          this.setLoading(false);
          this.alertService.clear();
        },
        error: err => {
          this.setLoading(false);
          this.alertService.error(err);
        },
      });

    //Observer of query change.
    this.query$ = fromEvent(this.query.nativeElement, 'keyup')
      .pipe(
        map((e: any) => e.target.value),
        debounceTime(300),
        tap(() => this.setLoading(true)),
        switchMap((query: string) =>
          this.searchService.get({
            source: this.source.nativeElement.value,
            query: query,
          })
        )
      )
      .subscribe({
        next: data => {
          this.problemsEvent.emit(data);
          this.setLoading(false);
          this.alertService.clear();
        },
        error: err => {
          this.setLoading(false);
          this.alertService.error(err);
        },
      });
  }

  private setLoading(status: boolean): void {
    this.loadingEvent.emit(status);
  }

  reSpide(): void {
    this.query.nativeElement.value = '';
    this.searchService.reSpide(this.source.nativeElement.value).subscribe({
      next: data => this.problemsEvent.emit(data),
      error: err => this.alertService.error(err),
    });
  }
  ngOnDestroy(): void {
    this.query$.unsubscribe();
    this.source$.unsubscribe();
  }
}
