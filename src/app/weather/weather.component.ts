import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from '../weather.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather.component.html',
})
export class WeatherComponent implements OnInit, OnDestroy {
  private weatherSubscription: Subscription = new Subscription();

  myweather: any;
  temperture: number = 0;
  maxTemp: number = 0;
  minTemp: number = 0;
  humidity: number = 0;
  windSpeed: number = 0;
  feelsLike: number = 0;
  weatherIcon: string = '';
  city: string = 'Kabul';
  country: string = 'AF';
  units: string = 'metric';
  searchQuery: string = '';
  weatherData: any;

  constructor(private weatherService: WeatherService) {}
  ngOnInit(): void {
    // Souscrivez à weatherData pour recevoir les mises à jour
    this.weatherSubscription = this.weatherService.getWeatherData().subscribe({
      next: (data: any) => {
        if (data) {
          // Assurez-vous que les données ne sont pas null
          this.updateWeatherComponent(data);
        }
      },
      error: (err: any) => console.error(err),
    });

    // Initialisation de la demande de données météo
    this.weatherService.getWeather(this.city, this.units).subscribe({
      next: (res: any) => this.weatherService.updateWeatherData(res),
      error: (err: any) => console.error(err),
    });
  }

  ngOnDestroy(): void {
    // Assurez-vous de désabonner pour éviter les fuites de mémoire
    this.weatherSubscription.unsubscribe();
  }

  updateWeatherComponent(data: any): void {
    // Mettez à jour les propriétés du composant avec les nouvelles données
    this.myweather = data;
    this.temperture = data.main.temp;
    this.maxTemp = data.main.temp_max;
    this.minTemp = data.main.temp_min;
    this.city;
    this.humidity = data.main.humidity;
    this.windSpeed = data.wind.speed;
    this.city = data.name;
    this.feelsLike = data.main.feels_like;
    this.country = data.sys.country;
    this.weatherIcon = this.getWeatherIconPath(data.weather[0].icon);

    // La méthode getWeatherIconPath reste inchangée
  }
  getWeatherIconPath(iconCode: string): string {
    switch (iconCode) {
      case '02d':
      case '02n':
        return '/assets/Sun-And-CloudsV2.gif';
      case '01d':
      case '01n':
        return '/assets/SunnyV2.gif';
      case '03d':
      case '03n':
        return '/assets/Half-Sun-Half-CloudsV2.gif';
      case '04d':
      case '04n':
        return '/assets/CloudyV2.gif';
      case '09d':
      case '09n':
        return '/assets/Slight-RainV2.gif';
      case '10d':
      case '10n':
        return '/assets/RainV2.gif';
      case '11d':
      case '11n':
        return '/assets/ThunderstormV2.gif';
      default:
        return '/assets/Sun-And-CloudsV2.gif';
    }
  }

  currentDate = new Date();
}
