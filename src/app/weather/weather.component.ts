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
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  currentDate = new Date();
}
