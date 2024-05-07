import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingModel } from '../../../shared/weather.model';
import { WeatherDataService } from '../../../shared/weather-data.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrl: './units.component.css',
})
export class UnitsComponent implements OnInit {
  @Input() radioArr: SettingModel;
  title: string;
  active: string;
  selectedOption: string;

  constructor(private weatherDataServise: WeatherDataService) {}

  ngOnInit(): void {
    this.title = this.radioArr.title;
    this.active = this.radioArr.selected;
    this.selectedOption = this.radioArr.selected;
  }

  onClick(form: NgForm) {
    this.active = form.value[this.title];
    this.weatherDataServise.updateSetting(this.title, this.active);
  }
}
