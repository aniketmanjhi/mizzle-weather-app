import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WeatherDataService } from '../../shared/weather-data.service';
import {
  CurrentModel,
  ForecastDayModel,
  HourDataModel,
  SettingModel,
  WeatherDataModel,
  forecastFutureModel,
} from '../../shared/weather.model';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.css',
})
export class WeatherForecastComponent implements OnInit, OnDestroy {
  private subscribeForCityName: Subscription;
  // Initial Value
  cityName: string = '';
  cityRegionName: string = '';
  currentCondition: string = '';
  cityTemp: number = null;
  currentConditionImage: string = '';
  weatherData: any;
  queryParamsValue: string;
  hours: HourDataModel[];
  airConditionLess = [];
  airConditionMore = [];
  airConditionIcons = {
    feels_Like: 'ri-temp-hot-line',
    humidity: 'ri-fire-line',
    uv: 'ri-sun-line',
    wind: 'ri-cloud-windy-line',
    visibilty: `ri-eye-line`,
    pressure: `ri-speed-up-line`,
    gust: `ri-windy-line`,
    precipitation: `ri-rainy-line`,
  };
  forecastFuture = [];

  isAirConditionMoreOpen = false;
  addPaddingOnBox: boolean = false;
  current: CurrentModel;
  weatherSetting: SettingModel[];
  hourCurrentUI: string;
  animationNone = false;

  error = null;
  isFetched = false;
  isLoaded = true;

  feelsLikeData: number;
  windData: number;
  windUnit: string;
  visibilityData: number;
  visibilityUnit: string;
  pressureData: number;
  pressureUnit: string;
  precipitaionData: number;
  precipitaionUnit: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private weatherDataService: WeatherDataService
  ) {}

  ngOnInit(): void {
    this.weatherSetting = this.weatherDataService.getSettings();

    this.route.queryParams.subscribe((data) => {
      this.queryParamsValue = data['search'];
      this.CurrentCityData(this.queryParamsValue);
    });

    this.subscribeForCityName = this.weatherDataService.cityName.subscribe(
      (cityName: string) => {
        this.ui(false, true);
        this.CurrentCityData(cityName);

        const queryParams: Params = { search: cityName };
        this.router.navigate(['/weather/weather-forecast'], {
          queryParams,
        });

        this.onSeeLess();
      }
    );
  }

  CurrentCityData(cityName: string) {
    this.weatherDataService.fetchData(cityName).subscribe({
      next: (data: WeatherDataModel) => {
        this.ui(true, false);
        this.weatherData = data;
        this.current = this.weatherData.current;

        // Weather Data
        this.feelsLikeData = this.weatherDataService.getUpdatedSettingData(
          'feelslike_c',
          'feelslike_f',
          this.current,
          this.weatherSetting
        );
        this.windData = this.weatherDataService.getUpdatedSettingData(
          'wind_kph',
          'wind_mph',
          this.current,
          this.weatherSetting
        );
        this.windUnit = this.weatherDataService.getUpdatedWeatherUnit(
          'wind',
          'kph',
          this.current,
          this.weatherSetting
        );
        this.visibilityData = this.weatherDataService.getUpdatedSettingData(
          'vis_km',
          'vis_miles',
          this.current,
          this.weatherSetting
        );
        this.visibilityUnit = this.weatherDataService.getUpdatedWeatherUnit(
          'visibility',
          'km',
          this.current,
          this.weatherSetting
        );
        this.pressureData = this.weatherDataService.getUpdatedSettingData(
          'pressure_in',
          'pressure_mb',
          this.current,
          this.weatherSetting
        );
        this.pressureUnit = this.weatherDataService.getUpdatedWeatherUnit(
          'pressure',
          'in',
          this.current,
          this.weatherSetting
        );
        this.precipitaionData = this.weatherDataService.getUpdatedSettingData(
          'precip_in',
          'precip_mm',
          this.current,
          this.weatherSetting
        );
        this.precipitaionUnit = this.weatherDataService.getUpdatedWeatherUnit(
          'precipitaion',
          'in',
          this.current,
          this.weatherSetting
        );

        this.updateCityWeatherInCel(
          this.weatherData.location.name,
          this.weatherData.location.region
        );

        this.updateTodayForeCast(
          this.weatherData.forecast.forecastday[0].hour,
          this.weatherData.location.localtime
        );

        this.updateAirConditionLess(this.weatherData.current);

        this.updateAirConditionMore(this.weatherData.current);

        this.updateForecastFuture(this.weatherData.forecast.forecastday);

        this.error = null;
      },
      error: (err) => {
        if (err.status === 0) {
          this.error = 'Internet Problem';
        } else if (err.status === 400) {
          this.error = 'Location not Found';
        } else {
          this.error = err.statusText;
        }
      },
    });
  }

  updateCityWeatherInCel(name: string, region: string) {
    this.cityName = name;
    this.cityRegionName = region.split(',').slice(-1).join('');
    this.currentCondition = this.current.condition.text;
    this.currentConditionImage = this.current.condition.icon;
    this.cityTemp = this.weatherDataService.getUpdatedSettingData(
      'temp_c',
      'temp_f',
      this.current,
      this.weatherSetting
    );
  }

  updateTodayForeCast(hourData: any[], time: string) {
    const hoursArr: HourDataModel[] = [];
    let currentTime = +time.slice(-5).split(':')[0];

    for (let i = currentTime; i < 24; i++) {
      const needData: any = {
        condition: { icon: hourData[i].condition.icon },
        temp: this.weatherDataService.getUpdatedSettingData(
          'temp_c',
          'temp_f',
          hourData[i],
          this.weatherSetting
        ),
        time: hourData[i].time,
      };
      hoursArr.push(needData);
    }
    this.hourCurrentUI = hoursArr[0].time;
    this.hours = hoursArr;
  }

  updateAirConditionLess(current: CurrentModel) {
    const airConditionLessInCel = {
      feels_Like: `${this.feelsLikeData}`,
      humidity: `${current.humidity}%`,
      uv: `${current.uv}`,
      wind: `${this.windData} ${this.windUnit}`,
    };

    for (const key in airConditionLessInCel) {
      this.airConditionLess.push({
        name: key,
        value: airConditionLessInCel[key],
        icons: this.airConditionIcons[key],
      });

      if (this.airConditionLess.length > 4) {
        this.airConditionLess.shift();
      }
    }
  }

  updateAirConditionMore(current: CurrentModel) {
    const airConditionMoreInCel = {
      feels_Like: `${this.feelsLikeData}`,
      humidity: `${current.humidity}%`,
      uv: `${current.uv}`,
      wind: `${this.windData} ${this.windUnit}`,
      visibilty: `${this.visibilityData} ${this.visibilityUnit}`,
      pressure: `${this.pressureData} ${this.pressureUnit}`,
      gust: `${current.gust_kph} ${this.windUnit}`,
      precipitation: `${this.precipitaionData} ${this.precipitaionUnit}`,
    };

    for (const key in airConditionMoreInCel) {
      this.airConditionMore.push({
        name: key,
        value: airConditionMoreInCel[key],
        icons: this.airConditionIcons[key],
      });

      if (this.airConditionMore.length > 8) {
        this.airConditionMore.shift();
      }
    }
  }

  updateForecastFuture(forecastDayArr: ForecastDayModel[]) {
    forecastDayArr.forEach((el: ForecastDayModel) => {
      const forecastday: forecastFutureModel = {
        date: el.date,
        icon: el.day.condition.icon,
        text: el.day.condition.text,
        maxtemp: this.weatherDataService.getUpdatedSettingData(
          'maxtemp_c',
          'maxtemp_f',
          el.day,
          this.weatherSetting
        ),
        mintemp: this.weatherDataService.getUpdatedSettingData(
          'mintemp_c',
          'mintemp_f',
          el.day,
          this.weatherSetting
        ),
        tempUnit: this.weatherDataService.getUpdatedWeatherUnit(
          'temprature',
          'c',
          this.current,
          this.weatherSetting
        ),
      };

      this.forecastFuture.push(forecastday);
      if (this.forecastFuture.length > 7) {
        this.forecastFuture.shift();
      }
    });
  }
  ui(fetched: boolean, loaded: boolean) {
    this.isFetched = fetched;
    this.isLoaded = loaded;
  }

  onSeeMore() {
    this.isAirConditionMoreOpen = true;
    this.addPaddingOnBox = true;
  }
  onSeeLess() {
    this.isAirConditionMoreOpen = false;
    this.animationNone = true;
    this.addPaddingOnBox = false;
  }
  onRetry() {
    this.error = null;
    this.isLoaded = false;
  }

  ngOnDestroy(): void {
    this.subscribeForCityName.unsubscribe();
  }
}
