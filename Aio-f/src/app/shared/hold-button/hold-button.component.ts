import {
  Component,
  Renderer2,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { Subject, interval } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-hold-button',
  templateUrl: './hold-button.component.html',
  styleUrls: ['./hold-button.component.scss'],
})
export class HoldButtonComponent {
  @ViewChild('btn', { static: true }) btn!: ElementRef<HTMLButtonElement>;
  @Output() holdEvent = new EventEmitter<void>();
  constructor(private render: Renderer2) {}

  holding = false;
  progress = 0;
  private destroy$ = new Subject();

  onMouseDown() {
    this.holding = true;
    interval(100)
      .pipe(
        takeUntil(this.destroy$),
        filter(() => this.holding)
      )
      .subscribe(() => {
        this.progress += 0.1;
        if (this.progress >= 1) {
          this.onDelete();
        }
      });
  }

  onMouseUp() {
    this.holding = false;
    this.progress = 0;
  }

  onMouseLeave() {
    if (this.holding) {
      this.onMouseUp();
    }
  }

  onDelete() {
    this.holding = false;
    this.progress = 0;
    this.render.removeClass(this.btn.nativeElement, 'btn-outline-danger');
    this.render.addClass(this.btn.nativeElement, 'btn-outlink-dark');
    this.holdEvent.emit();
  }

  ngOnDestroy() {
    // FIXME:
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
