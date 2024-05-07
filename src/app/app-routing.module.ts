import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { StartComponent } from './start/start.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherForecastComponent } from './weather/weather-forecast/weather-forecast.component';
import { SettingComponent } from './weather/setting/setting.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: '',
    component: StartComponent,
  },
  {
    path: 'weather',
    component: WeatherComponent,
    children: [
      { path: '', redirectTo: 'weather-forecast', pathMatch: 'full' },
      {
        path: 'weather-forecast',
        component: WeatherForecastComponent,
      },
      { path: 'setting', component: SettingComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
