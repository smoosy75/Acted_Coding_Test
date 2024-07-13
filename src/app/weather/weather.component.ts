import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  myweather: any;
  temperture: number = 0;
  maxTemp: number = 0;
  minTemp: number = 0;
  humidity: number = 0;
  windSpeed: number = 0;
  feelsLike: number = 0;
  weatherIcon: string = '';
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getWeather().subscribe({
      next: (res) => {
        console.log(res);
        this.myweather = res;
        console.log(this.myweather);
        this.temperture = this.myweather.main.temp;
        this.maxTemp = this.myweather.main.temp_max;
        this.minTemp = this.myweather.main.temp_min;
        this.humidity = this.myweather.main.humidity;
        this.windSpeed = this.myweather.wind.speed;
        this.feelsLike = this.myweather.main.feels_like;
        this.weatherIcon = this.getWeatherIconPath(
          this.myweather.weather[0].icon
        );
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  getWeatherIconPath(iconCode: string): string {
    switch (iconCode) {
      case '02d' || 'O2n':
        return '/assets/Sun-And-CloudsV2.gif';
      case '01d' || '01n':
        return '/assets/SunnyV2.gif';
      case '03d' || '03n':
        return '/assets/Half-Sun-Half-CloudsV2.gif';
      case '04d' || '04n':
        return '/assets/CloudyV2.gif';
      case '09d' || '09n':
        return '/assets/Slight-RainV2.gif';
      case '10d' || '10n':
        return '/assets/RainV2.gif';
      case '11d' || '11n':
        return '/assets/ThunderstormV2.gif';
      default:
        return '/assets/Sun-And-CloudsV2.gif';
    }
  }

  currentDate = new Date();
}
