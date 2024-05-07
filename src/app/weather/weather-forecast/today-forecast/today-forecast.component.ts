import { Component, Input, OnInit } from '@angular/core';
import { HourDataModel } from '../../../shared/weather.model';

@Component({
  selector: 'app-today-forecast',
  templateUrl: './today-forecast.component.html',
  styleUrl: './today-forecast.component.css',
})
export class TodayForecastComponent implements OnInit {
  @Input() hourData: HourDataModel;
  @Input() hour: number;
  @Input() hourCurrent: string;

  time() {
    if (this.hour <= 12) {
      return `${this.hour.toString().padStart(2, '0') || '12'}:00 AM`;
    } else {
      return `${(this.hour % 12).toString().padStart(2, '0')}:00 PM`;
    }
  }

  temprature() {
    return this.hourData.temp;
  }

  ngOnInit(): void {
    this.hour = +this.hourData.time.slice(-5).split(':')[0];
    this.hourCurrent = this.hourCurrent.slice(-5).split(':')[0];
  }
}
