import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "../environments/environment"
import { environment } from '../environments/api';

@Injectable({
  providedIn: "root"
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(place) {
    if (!place){
      return null;
    }
    const myHeaders = new HttpHeaders().set('X-Yandex-API-Key', environment.apiWeather);
    return this.http.get(
      `https://api.weather.yandex.ru/v2/forecast?lat=${place.lat}&lon=${place.long}`, {headers: myHeaders});
  }
}
