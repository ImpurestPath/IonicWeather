import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(place) {
    if (!place){
      return null;
    }
    const myHeaders = new HttpHeaders().set('X-Yandex-API-Key', '48026f1d-5c40-44e3-a3e5-42fcff1ab68b');
    return this.http.get(
      `https://api.weather.yandex.ru/v1/forecast?lat=${place.lat}&lon=${place.long}`, {headers: myHeaders});
  }
}
