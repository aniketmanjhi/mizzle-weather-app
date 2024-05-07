import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingModel } from '../../shared/weather.model';
import { WeatherDataService } from '../../shared/weather-data.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css',
})
export class SettingComponent implements OnInit {
  settings: SettingModel[];

  constructor(private weatherDataServise: WeatherDataService) {}

  ngOnInit(): void {
    this.settings = this.weatherDataServise.getSettings();
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
