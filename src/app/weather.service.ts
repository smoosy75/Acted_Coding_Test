import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather() {
    return this.http.get(
      'http://api.openweathermap.org/data/2.5/weather?q=Kabul&appid=824b6cac4fa918e17f88068e8c638c68&units=metric'
    );
  }
}
