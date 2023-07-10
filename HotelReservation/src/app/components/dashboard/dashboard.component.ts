import { Component } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import * as Highcharts from 'highcharts';
import { columnChartOptions } from 'src/app/charts/column-chart';
import { Booking } from 'src/app/models/booking';
import { BookingsService } from 'src/app/services/bookings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  //properties
  dashboardGridCols: number = 4;
  cardColspan: number = 2;
  bookings: Booking[] = [];
  highcharts = Highcharts;
  // columnChart: Chart = new Chart(columnChartOptions);
  columnChart:Highcharts.Options = columnChartOptions;
  bookingsLoadingStarted: boolean = false;

  constructor(
    private mediaObserver: MediaObserver,
    private bookingsService: BookingsService
  ) {}

  ngOnInit(): void {
    //responsive dashbaord
    this.mediaObserver.asObservable().subscribe((media: MediaChange[]) => {
      if (media.some((mediaChange) => mediaChange.mqAlias == 'lt-sm')) {
        this.dashboardGridCols = 1;
        this.cardColspan = 1;
      } else if (media.some((mediaChange) => mediaChange.mqAlias == 'lt-md')) {
        this.dashboardGridCols = 2;
        this.cardColspan = 2;
      } else {
        this.dashboardGridCols = 4;
        this.cardColspan = 2;
      }
    });

    //bookings
    this.bookingsLoadingStarted = true;
    this.bookingsService.getBookings().subscribe({
      next: (response: any) => {
        this.bookings = response;
        this.bookingsLoadingStarted = false;
      },
      error: (error) => {
        console.log(error);
        this.bookingsLoadingStarted = false;
      },
    });
  }
}
