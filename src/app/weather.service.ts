import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environment/environment';

interface WeatherResponse {
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: [
    {
      icon: string;
    }
  ];
  name: string;
  sys: {
    country: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherData = new BehaviorSubject<WeatherResponse | null>(null);

  constructor(private http: HttpClient) {}

  getWeather(city: string, units: string): Observable<WeatherResponse> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${environment.weatherApiKey}&units=${units}`;
    return this.http.get<WeatherResponse>(url).pipe(
      catchError((error) => {
        console.error('Error fetching weather data:', error);
        return throwError(error);
      })
    );
  }

  updateWeatherData(data: WeatherResponse) {
    this.weatherData.next(data);
  }

  getWeatherData(): Observable<WeatherResponse | null> {
    return this.weatherData.asObservable();
  }
}
