export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
}

export interface WeatherResponse {
  name: string;
  weather: Weather[];
  main: MainWeather;
}

export interface Sys {
  sunrise: number;
  sunset: number;
}

export interface Wind {
  speed: number;
}

export interface WeatherResponse {
  name: string;
  weather: Weather[];
  main: MainWeather;
  wind: Wind;
  visibility: number;
  sys: Sys;
}

export interface ForecastItem {
  dt: number;
  main: {
    temp_min: number;
    temp_max: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

export interface ForecastResponse {
  list: ForecastItem[];
}