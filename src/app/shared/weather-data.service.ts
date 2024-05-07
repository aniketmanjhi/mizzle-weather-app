import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CurrentModel, ForecastDayModel, SettingModel } from './weather.model';

@Injectable({ providedIn: 'root' })
export class WeatherDataService {
  private apiKey: string = ''; // api key
  cityName = new Subject<string>();
  settingSub = new Subject<string>();
  searchToggle = new Subject<boolean>();
  searchToggleInput = new Subject<boolean>();
  settings: SettingModel[] = [
    {
      title: 'temperature',
      data: [
        { id: 'temp_1', label: 'Celsius', value: 'c' },
        { id: 'temp_2', label: 'Fahrenheit', value: 'f' },
      ],
      selected: 'c',
    },
    {
      title: 'wind_speed',
      data: [
        { id: 'ws_1', label: 'km/h', value: 'kph' },
        { id: 'ws_2', label: 'm/h', value: 'mph' },
      ],
      selected: 'kph',
    },
    {
      title: 'visibility',
      data: [
        { id: 'vis_1', label: 'Kilometer', value: 'km' },
        { id: 'vis_2', label: 'Miles', value: 'miles' },
      ],
      selected: 'km',
    },
    {
      title: 'pressure',
      data: [
        { id: 'pressure_1', label: 'Inches', value: 'in' },
        { id: 'pressure_2', label: 'Millibars', value: 'mb' },
      ],
      selected: 'in',
    },
    {
      title: 'precipitaion',
      data: [
        { id: 'precip_1', label: 'Inches', value: 'in' },
        { id: 'precip_2', label: 'Milimeters', value: 'mm' },
      ],
      selected: 'in',
    },
  ];

  constructor(private http: HttpClient) {}

  fetchData(city: string) {
    return this.http.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${city}&days=7&aqi=no&alerts=no`
    );
  }

  getSettings() {
    return this.settings;
  }

  updateSetting(title: string, updateSelect: string) {
    this.settings.forEach((el) => {
      if (el.title == title) {
        el.selected = updateSelect;
      }
    });
  }

  getUpdatedSettingData(
    first: string,
    second: string,
    current: CurrentModel | ForecastDayModel['day'],
    currentSetting: SettingModel[],
    keyName: boolean = false
  ) {
    for (const key in current) {
      const keyLengthArr = key.split('_').length;
      const lastValue = key.split('_')[keyLengthArr - 1];
      const [selected] = currentSetting.filter(
        (el: any) => el.selected == lastValue
      );
      if (lastValue == selected?.selected) {
        if ((first == key || second == key) && !keyName) {
          return current[key];
        } else if ((first == key || second == key) && keyName) {
          return key;
        }
      }
    }
  }

  getUpdatedWeatherUnit(
    value: string,
    compareValue: string,
    current: CurrentModel,
    currentSetting: SettingModel[]
  ) {
    let unitName: string;
    switch (value) {
      case 'temprature':
        unitName =
          this.getUpdatedSettingData(
            'temp_c',
            'temp_f',
            current,
            currentSetting,
            true
          ).split('_')[1] === compareValue
            ? 'c'
            : 'f';
        break;

      case 'wind':
        unitName =
          this.getUpdatedSettingData(
            'wind_kph',
            'wind_mph',
            current,
            currentSetting,
            true
          ).split('_')[1] === compareValue
            ? 'km/h'
            : 'm/h';
        break;

      case 'visibility':
        unitName =
          this.getUpdatedSettingData(
            'vis_km',
            'vis_miles',
            current,
            currentSetting,
            true
          ).split('_')[1] === compareValue
            ? 'km'
            : 'miles';
        break;

      case 'pressure':
        unitName =
          this.getUpdatedSettingData(
            'pressure_in',
            'pressure_mb',
            current,
            currentSetting,
            true
          ).split('_')[1] === compareValue
            ? 'in'
            : 'mb';
        break;

      case 'precipitaion':
        unitName =
          this.getUpdatedSettingData(
            'precip_in',
            'precip_mm',
            current,
            currentSetting,
            true
          ).split('_')[1] === compareValue
            ? 'in'
            : 'mm';
        break;

      default:
        unitName = 'not found';
        break;
    }

    return unitName;
  }
}
