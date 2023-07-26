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
import { AlertService, ProblemSearchService } from '../../_services';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-problem-search',
  templateUrl: './problem-search.component.html',
  styleUrls: ['./problem-search.component.scss'],
})
export class ProblemSearchComponent implements AfterViewInit {
  sources: Array<string>;

  @Output() problemsEvent = new EventEmitter<any>();
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
    this.source.nativeElement.value = this.searchService.getSource();
    this.query.nativeElement.value = this.searchService.getQuery();
  }

  ngOnInit(): void {
    this.sources = environment.vproblemsSources;

    //Observer of source change.
    this.source$ = fromEvent(this.source.nativeElement, 'change').subscribe({
      next: (e: any) => {
        this.problemsEvent.emit({
          source: e.target.value,
          query: this.query.nativeElement.value,
        });
      },
    });

    //Observer of query change.
    this.query$ = fromEvent(this.query.nativeElement, 'keyup')
      .pipe(debounceTime(300))
      .subscribe({
        next: (e: any) => {
          this.problemsEvent.emit({
            source: this.source.nativeElement.value,
            query: e.target.value,
          });
        },
      });
  }

  reSpide(): void {
    this.query.nativeElement.value = '';
    this.searchService.reSpide(this.source.nativeElement.value).subscribe({
      next: (data) => this.problemsEvent.emit(data),
      error: (err) => this.alertService.error(err),
    });
  }
  ngOnDestroy(): void {
    this.query$.unsubscribe();
    this.source$.unsubscribe();
  }
}
