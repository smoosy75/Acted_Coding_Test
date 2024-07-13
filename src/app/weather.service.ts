import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherData = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  // Modifier le type de retour à Observable<any>
  getWeather(city: string, units: string): Observable<any> {
    return this.http.get<any>(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=824b6cac4fa918e17f88068e8c638c68&units=${units}`
    );
  }
  updateWeatherData(data: any) {
    this.weatherData.next(data);
  }

  getWeatherData() {
    return this.weatherData.asObservable();
  }
}
