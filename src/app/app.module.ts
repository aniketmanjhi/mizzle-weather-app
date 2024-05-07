import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './weather/header/header.component';
import { StartComponent } from './start/start.component';
import { WeatherDaysForecastComponent } from './weather/weather-forecast/weather-days-forecast/weather-days-forecast.component';
import { SearchBoxComponent } from './weather/search-box/search-box.component';
import { SettingComponent } from './weather/setting/setting.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WeatherComponent } from './weather/weather.component';
import { AirConditionDetailsComponent } from './weather/weather-forecast/air-condition-details/air-condition-details.component';
import { WeatherForecastComponent } from './weather/weather-forecast/weather-forecast.component';
import { TodayForecastComponent } from './weather/weather-forecast/today-forecast/today-forecast.component';
import { HttpClientModule } from '@angular/common/http';
import { UnitsComponent } from './weather/setting/units/units.component';
import { RemoveUnderscorePipe } from './remove-underscore.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WeatherForecastComponent,
    AirConditionDetailsComponent,
    WeatherDaysForecastComponent,
    StartComponent,
    PageNotFoundComponent,
    SettingComponent,
    HeaderComponent,
    SearchBoxComponent,
    WeatherComponent,
    TodayForecastComponent,
    UnitsComponent,
    RemoveUnderscorePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
