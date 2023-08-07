import { Component } from '@angular/core';
import { ViewChild, TemplateRef } from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getInfo().subscribe({
      next: data => {
        const recentContests = data.recent_contests;

        recentContests.forEach(contest => {
          const event = {
            start: new Date(contest.start_time),
            end: new Date(contest.end_time),
            title: contest.name,
            allDay: false,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: true,
          };
          this.events.push(event);
        });
      },
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log('fuck');
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
