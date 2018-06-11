import { Component, OnInit } from '@angular/core';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';

import { Subject } from 'rxjs/Subject';
import {CalendarDateFormatter, CalendarEvent, CalendarEventAction, DAYS_OF_WEEK} from 'angular-calendar';
import { ActivatedRoute, Params } from '@angular/router';
import { WorkplaceService } from '../../../services/workplace.service';
import { Workplace } from '../../../models/workplace';
import { TimeSlotService } from '../../../services/time-slot.service';
import { TimeSlot } from '../../../models/timeSlot';
import { User } from '../../../models/user';
import { AuthenticationService } from '../../../services/authentication.service';
import {isNumber} from "util";

const colors: any = {
  green: {
    primary: '#33ad21',
    secondary: '#FAE3E3'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  red: {
    primary: '#ad2121',
    secondary: '#FDF1BA'
  },
  reserved: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
};

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CalendarDateFormatter
    }
  ]
})
export class ReservationPageComponent implements OnInit {
  view = 'month';
  viewDate: Date = new Date();
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  locale = 'fr';
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen = false;
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-plus"></i> S\'inscrire',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.eventClicked(event);
      }
    }
  ];

  workplace: Workplace;
  listTimeSlots: TimeSlot[];
  selectedTimeSlots: TimeSlot[] = [];
  totalBill = 0;

  user: User;
  constructor(private activatedRoute: ActivatedRoute,
              private workplaceService: WorkplaceService,
              private timeSlotService: TimeSlotService,
              private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.workplaceService.get(params['id']).subscribe(
        data => {
          this.workplace = new Workplace(data);
          this.timeSlotService.list().subscribe(
            timeSlots => {
              this.listTimeSlots = timeSlots.results.map(l => new TimeSlot(l));
              this.syncCalendarEvent();
            }
          );
        }
      );
    });

    this.user = this.authenticationService.getProfile();
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
        this.viewDate = date;
      }
    }
  }

  eventClicked(event) {
    for (const timeSlot of this.listTimeSlots) {
      if (timeSlot.id === event.id && this.selectedTimeSlots.indexOf(timeSlot) === -1) {
        this.addToCart(timeSlot);
      }
    }
  }

  addToCart(timeSlot) {
    this.selectedTimeSlots.push(timeSlot);
    this.totalBill += Number(timeSlot.price);
    for (const event of this.events) {
      if (event.id === timeSlot.id) {
        event.color = colors.reserved;
        event.actions = null;
      }
    }
  }

  removeFromCart(timeSlot) {
    const index = this.selectedTimeSlots.indexOf(timeSlot);
    if (index > -1) {
      this.selectedTimeSlots.splice(index, 1);
      this.totalBill -= timeSlot.price;
      for (const event of this.events) {
        if (event.id === timeSlot.id) {
          event.color = colors.yellow;
          event.actions = this.actions;
        }
      }
    }
  }

  syncCalendarEvent() {
    this.events = [];
    for (const timeSlot of this.listTimeSlots) {
      this.events.push(this.timeSlotAdapter(timeSlot));
    }
  }

  timeSlotAdapter(timeSlot) {
    return {
      id: timeSlot.id,
      start: new Date(timeSlot.start_time),
      end: new Date(timeSlot.end_time),
      title: timeSlot.getStartTime() + '-' + timeSlot.getEndTime() + ' (# places restantes)',
      color: colors.yellow,
      actions: this.actions,
    };
  }
}
