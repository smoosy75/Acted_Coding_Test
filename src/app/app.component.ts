import { Component } from '@angular/core';
import { WeatherComponent } from './weather/weather.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WeatherComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'weatherAppTest';
  showWeather = false;

  toggleWeather() {
    this.showWeather = !this.showWeather;
  }
}
