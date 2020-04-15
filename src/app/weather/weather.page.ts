import { Component, OnInit } from "@angular/core";
import { PlaceService } from "../place.service";
import { WeatherService } from "../weather.service";
import { Place } from "../place";
import { take } from "rxjs/operators";
import { Router } from '@angular/router';

@Component({
  selector: "app-weather",
  templateUrl: "./weather.page.html",
  styleUrls: ["./weather.page.scss"]
})
export class WeatherPage implements OnInit {
  place: Place;
  weather: any;
  weatherConditions: string;
  constructor(
    private placeService: PlaceService,
    private weatherService: WeatherService,
    private router: Router
  ) {}

  getConditions(weather) {
    switch (this.weather.fact.condition) {
      case "clear":
        return "ясно";
        break;
      case "partly-cloudy":
        return "малооблачно";
        break;
      case "cloudy":
        return "облачно с прояснениями";
        break;
      case "overcast":
        return "пасмурно";
        break;
      case "partly-cloudy-and-light-rain":
        return "небольшой дождь";
        break;
      case "partly-cloudy-and-rain":
        return "дождь";
        break;
      case "overcast-and-rain":
        return "сильный дождь";
        break;
      case "overcast-thunderstorms-with-rain":
        return "сильный дождь, гроза";
        break;
      case "cloudy-and-light-rain":
        return "небольшой дождь";
        break;
      case "overcast-and-light-rain":
        return "небольшой дождь";
        break;
      case "cloudy-and-rain":
        return "дождь";
        break;
      case "overcast-and-wet-snow":
        return " дождь со снегом";
        break;
      case "partly-cloudy-and-light-snow":
        return "небольшой снег";
        break;
      case "partly-cloudy-and-snow":
        return "снег";
        break;
      case "overcast-and-snow":
        return "снегопад";
        break;
      case "cloudy-and-light-snow":
        return "небольшой снег";
        break;
      case "overcast-and-light-snow":
        return "небольшой снег";
        break;
      case "cloudy-and-snow":
        return "снег";
        break;
      default:
        return "";
        break;
    }
  }
  async ngOnInit() {
    this.placeService.getFormattedPlace().subscribe(async data => {
      this.place = data;
      this.weather = await this.weatherService
      .getWeather(this.place)
      .pipe(take(1))
      .toPromise();
      console.log(this.weather);
      this.weatherConditions = this.getConditions(this.weather);
    });
    
  }

  changePlace(){
    this.router.navigateByUrl('home') ;
  }
}
