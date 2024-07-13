import { Component } from '@angular/core';
import { WeatherService } from './weather.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherComponent } from './weather/weather.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WeatherComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'weatherAppTest';
  showWeather = false;
  cityName: string = '';

  constructor(private weatherService: WeatherService) {}

  toggleWeather() {
    this.showWeather = !this.showWeather;
  }

  searchCity() {
    const units = 'metric';
    this.weatherService
      .getWeather(this.cityName, units)
      .pipe(
        catchError((error) => {
          console.error('Error fetching weather data:', error);
          return of(null);
        })
      )
      .subscribe((data) => {
        if (data) {
          this.weatherService.updateWeatherData(data);
          this.toggleWeather();
          this.showWeather = true;
        }
      });
  }
}
