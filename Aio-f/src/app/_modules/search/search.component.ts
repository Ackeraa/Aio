import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { fromEvent, Subscription, debounceTime } from 'rxjs';
import { SearchParams } from 'src/app/_services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() searchEvent = new EventEmitter<any>();
  @ViewChild('query', { static: true }) query: ElementRef;

  private query$: Subscription;

  constructor() {}

  ngOnInit(): void {
    //Observer of query change, need to be fixed, should watch the text change
    this.query$ = fromEvent(this.query.nativeElement, 'keyup')
      .pipe(debounceTime(300))
      .subscribe({
        next: (event: Event) => {
          const params: SearchParams = {
            query: (event.target as HTMLInputElement).value,
            page: 1,
          };
          this.searchEvent.emit(params);
        },
      });
  }

  ngOnDestroy(): void {
    this.query$.unsubscribe();
  }
}
