import { Component, Input, OnInit } from '@angular/core';
import { forecastFutureModel } from '../../../shared/weather.model';

@Component({
  selector: 'app-weather-days-forecast',
  templateUrl: './weather-days-forecast.component.html',
  styleUrl: './weather-days-forecast.component.css',
})
export class WeatherDaysForecastComponent implements OnInit {
  @Input() forecastFuture: forecastFutureModel;

  @Input() TodayIndex: number;

  getDate() {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const date = this.forecastFuture.date.slice(-2);
    const month = monthNames[new Date(this.forecastFuture.date).getMonth()];
    return `${date} ${month}`;
  }

  getWeek() {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const week = new Date(this.forecastFuture.date).getDay();
    return this.TodayIndex == 0 ? 'Today' : dayNames[week];
  }
  getCondtionName() {
    return this.forecastFuture.text.split(' ').slice(0, 2).join(' ');
  }

  ngOnInit(): void {}
}
