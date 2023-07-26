import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  fromEvent,
  Subscription,
  map,
  debounceTime,
  tap,
  switchMap,
} from 'rxjs';
import { AlertService } from '../../_services';
import { SearchService } from '../';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() uri: string;
  @Input() addition: any;
  @Output() itemsEvent = new EventEmitter<any>();
  @Output() loadingEvent = new EventEmitter<boolean>();
  @ViewChild('query', { static: true }) query: ElementRef;

  private query$: Subscription;

  constructor(
    private searchService: SearchService,
    private aleartService: AlertService
  ) {}

  ngOnInit(): void {
    this.onLoading(false);
    this.searchService.get({ addition: this.addition }, this.uri).subscribe({
      next: data => {
        this.itemsEvent.emit(data);
      },
      error: err => {
        this.aleartService.error(err);
      },
    });

    //Observer of query change, need to be fixed, should watch the text change
    this.query$ = fromEvent(this.query.nativeElement, 'keyup')
      .pipe(
        map((e: any) => e.target.value),
        debounceTime(300),
        tap(() => this.onLoading(true)),
        switchMap((query: string) =>
          this.searchService.get(
            {
              query: query,
              addition: this.addition,
            },
            this.uri
          )
        )
      )
      .subscribe({
        next: data => {
          this.onLoading(false);
          this.itemsEvent.emit(data);
        },
        error: err => {
          this.onLoading(false);
          this.aleartService.error(err);
        },
      });
  }

  private onLoading(status: boolean): void {
    this.loadingEvent.emit(status);
  }

  ngOnDestroy(): void {
    this.query$.unsubscribe();
  }
}
