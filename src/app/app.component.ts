import { Component } from '@angular/core';
import { WeatherComponent } from './weather/weather.component';
import { CommonModule } from '@angular/common';
import { WeatherService } from './weather.service';
import { FormsModule } from '@angular/forms';

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
  WeatherService: WeatherService; // Declare the WeatherService property
  cityName: string = ''; // Declare and initialize the cityName property

  constructor(private weatherService: WeatherService) {
    this.WeatherService = weatherService; // Initialize the WeatherService property
  }

  toggleWeather() {
    this.showWeather = !this.showWeather;
  }

  searchCity() {
    const units = 'metric'; // or 'imperial' depending on your preference
    this.WeatherService.getWeather(this.cityName, units).subscribe((data) => {
      this.WeatherService.updateWeatherData(data);
      this.toggleWeather();
      this.showWeather = true; // Ajoutez ou ajustez cette ligne selon votre logique d'application
    });
  }
}
