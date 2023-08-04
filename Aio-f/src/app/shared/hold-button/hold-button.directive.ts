import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[holdButton]',
})
export class HoldButtonDirective implements OnInit, OnDestroy {
  private holdButtonTimer: any;
  private holdTime = 1200;
  private holdClass = 'hold';
  private holdSpeed: number;

  @Input('holdButton') set holdButtonSpeed(speed: number) {
    this.holdSpeed = speed;
    if (speed === 3) {
      this.holdTime = 600;
      this.holdClass += ' fast';
    } else if (speed === 1) {
      this.holdTime = 1800;
      this.holdClass += ' slow';
    }
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.elementRef.nativeElement.classList.add(this.holdClass);
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  onHoldStart() {
    const element = this.elementRef.nativeElement;
    element.classList.add('pressed');
    element.setAttribute('title', 'Hold');
    // Optionally use a tooltip library to show the tooltip here
    // For example, ngx-bootstrap provides a tooltip directive you can use
    this.holdButtonTimer = setTimeout(() => {
      // Perform your action when the button is held
      this.elementRef.nativeElement.classList.remove('pressed');
      this.onHold();
    }, this.holdTime);
  }

  @HostListener('touchend', ['$event'])
  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onHoldEnd() {
    clearTimeout(this.holdButtonTimer);
    this.elementRef.nativeElement.classList.remove('pressed');
  }

  onHold() {
    // Add your action when the button is held here
    // For example, you can emit an event or call a function
    console.log('Button is held');
  }

  ngOnDestroy() {
    clearTimeout(this.holdButtonTimer);
  }
}
