export interface WeatherDataModel {
  current: CurrentModel;
  location: { name: string; region: string; localtime: string };
  forecast: {
    forecastday: ForecastDayModel[];
  };
}

export interface CurrentModel {
  condition: { text: string; icon: string };
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  uv: number;
  humidity: number;
  wind_kph: number;
  wind_mph: number;
  gust_kph: number;
  gust_mph: number;
  vis_km: number;
  vis_miles: number;
  pressure_in: number;
  pressure_mb: number;
  precip_in: number;
  precip_mm: number;
}

export interface ForecastdayModel {
  date: string;
  day: {
    condition: {
      icon: string;
      text: string;
    };
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
  };
}

export interface forecastFutureModel {
  date: string;
  icon: string;
  text: string;
  maxtemp: number;
  mintemp: number;
  tempUnit: string;
}

export interface HourDataModel {
  condition: { icon: string };
  temp: number;
  time: string;
}

export interface ForecastDayModel {
  date: string;
  day: {
    condition: {
      icon: string;
      text: string;
    };
    maxtemp_c: string;
    maxtemp_f: string;
    mintemp_c: string;
    mintemp_f: string;
  };
}

export interface SettingModel {
  title: string;
  data: { id: string; label: string; value: string }[];
  selected: string;
}
