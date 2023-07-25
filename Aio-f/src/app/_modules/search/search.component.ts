import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime, tap, switchMap } from 'rxjs/operators';
import { AlertService, SearchService } from '../../_services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() uri: string;
  @Input() addition: any = {};
  @Output() itemsEvent = new EventEmitter<any>();
  @Output() loadingEvent = new EventEmitter<boolean>();
  @ViewChild('query', { static: true }) query: ElementRef;

  constructor(
    private searchService: SearchService,
    private aleartService: AlertService
  ) {}

  ngOnInit(): void {
    this.onLoading(false);
    this.searchService.search(this.uri, '', this.addition).subscribe(data => {
      this.itemsEvent.emit(data);
    });

    //Observer of query change, need to be fixed, should watch the text change
    fromEvent(this.query.nativeElement, 'keyup')
      .pipe(
        map((e: any) => e.target.value),
        debounceTime(300),
        tap(() => this.onLoading(true)),
        switchMap((query: string) =>
          this.searchService.search(this.uri, query, this.addition)
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
}
