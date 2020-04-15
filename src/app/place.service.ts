import { Injectable } from "@angular/core";
import { Place } from "./place";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: "root"
})
export class PlaceService {
  googlePlace: any;
  place: BehaviorSubject<Place>;
  googlePlaceService: google.maps.places.PlacesService;
  constructor(private http: HttpClient) {
    this.place = new BehaviorSubject(null)
    let map = new google.maps.Map(document.createElement('div'));
    this.googlePlaceService = new google.maps.places.PlacesService(map);
    this.setGooglePlace({place_id: "ChIJybDUc_xKtUYRTM9XV8zWRD0"})
  }

  async setGooglePlace(item) {
    console.log(item);
    this.googlePlace = item;
    const request = {
      placeId: this.googlePlace.place_id,
      fields: ['name', 'formatted_address', 'place_id', 'geometry']
    };
    await this.googlePlaceService.getDetails(request,data => {
      const place: Place = {
        name: data.formatted_address,
        lat: data.geometry.location.lat(),
        long: data.geometry.location.lng()
      }
      this.place.next(place);
      console.log(place)
    });
    
  }

  getFormattedPlace() {
    return this.place;
  }
}
