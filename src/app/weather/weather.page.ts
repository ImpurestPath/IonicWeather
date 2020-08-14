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
  advice: string;
  weatherConditions: string;
  constructor(
    private placeService: PlaceService,
    private weatherService: WeatherService,
    private router: Router
  ) {}



  
  getConditions(condition) {
    switch (condition) {
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
      case "light-rain":
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
        return "что-то неизвестное";
        break;
    }
  }

  getAdvice(condition, temperature){
    let answer = ""
    if (temperature < 10){
      answer += "тепло одеться и"
    }
    else if (temperature < 20) {
      answer += "легко одеться и"
    }
    else {
      answer += "больше пить и"
    }
    switch (condition) {
      case "clear":
      case "partly-cloudy":
        answer += " наслаждаться солнцем";
        break;
      case "cloudy":
        answer +=  " рассматривать облака";
        break;
      case "overcast":
        answer += " не бояться солнечного удара";
        break;
      case "cloudy-and-light-rain":
      case "light-rain":
      case "partly-cloudy-and-light-rain":
      case "partly-cloudy-and-rain":
      case "overcast-and-light-rain":    
      case "cloudy-and-rain":
      case "overcast-and-wet-snow":      
      case "overcast-and-rain":         
        answer +=  " взять с собой зонт";
        break;
      case "overcast-thunderstorms-with-rain":
        answer +=  " лучше никуда не выходить";
        break;
      case "partly-cloudy-and-light-snow":
      case "cloudy-and-light-snow":
      case "overcast-and-light-snow":
        answer +=  " ловить снежинки"
        break;
      case "overcast-and-snow":
      case "partly-cloudy-and-snow":
      case "cloudy-and-snow":
        answer +=  ", если возможно, лепить снеговика";
        break;
      default:
        break;
    }
    return answer;
  }
  async ngOnInit() {
    this.placeService.getFormattedPlace().subscribe(async data => {
      this.place = data;
      this.weather = await this.weatherService
      .getWeather(this.place)
      .pipe(take(1))
      .toPromise();
      console.log(this.weather);
      console.log(this.weather.fact.condition)
      this.weatherConditions = this.getConditions(this.weather.fact.condition);
      this.advice = this.getAdvice(this.weather.fact.condition, this.weather.fact.feels_like)
    });
    
  }

  changePlace(){
    this.router.navigateByUrl('home') ;
  }
}
