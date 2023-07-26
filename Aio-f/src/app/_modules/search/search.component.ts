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
  @Input() url: string;
  @Input() addition: { [key: string]: string };
  @Output() itemsEvent = new EventEmitter<any>();
  @Output() loadingEvent = new EventEmitter<boolean>();
  @ViewChild('query', { static: true }) query: ElementRef;

  private query$: Subscription;

  constructor(
    private searchService: SearchService,
    private aleartService: AlertService
  ) {}

  ngOnInit(): void {
    this.setLoading(false);
    this.searchService.get({ addition: this.addition }, this.url).subscribe({
      next: data => {
        console.log('fuck', data);
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
        tap(() => this.setLoading(true)),
        switchMap((query: string) =>
          this.searchService.get(
            {
              query: query,
              addition: this.addition,
            },
            this.url
          )
        )
      )
      .subscribe({
        next: data => {
          this.setLoading(false);
          this.itemsEvent.emit(data);
        },
        error: err => {
          this.setLoading(false);
          this.aleartService.error(err);
        },
      });
  }

  private setLoading(status: boolean): void {
    this.loadingEvent.emit(status);
  }

  ngOnDestroy(): void {
    this.query$.unsubscribe();
  }
}
