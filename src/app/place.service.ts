import { Injectable } from "@angular/core";
import { Place } from "./place";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/api';

@Injectable({
  providedIn: "root"
})
export class PlaceService {
  originalPlace: any;
  place: BehaviorSubject<Place>;
  constructor(private http: HttpClient) {
    this.place = new BehaviorSubject(null)
    this.setPlace('Москва')
  }

  async setPlace(item) {
    console.log(item);
    this.originalPlace = item;
    this.http.get(`https://geocode-maps.yandex.ru/1.x?geocode=${item}&apikey=${environment.apiGeocode}&format=json`).toPromise().then((response:any) => {
      
      const longlat = response.response.GeoObjectCollection.​featureMember[0].​​​​​GeoObject.​Point.​pos.split(' ')
      this.place.next({
        lat: longlat[1],
        long: longlat[0],
        name: response.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted}
      )
      console.log(response.response)
    })

     
  }

  getFormattedPlace() {
    return this.place;
  }



}
