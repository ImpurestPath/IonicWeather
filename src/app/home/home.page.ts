/// <reference types="@types/googlemaps" />
import { Component, NgZone, OnInit } from "@angular/core";
import { PlaceService } from '../place.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocomplete: { input: string };
  autocompleteItems: any[];
  location: any;
  placeid: any;

  constructor(public zone: NgZone, private placeService: PlaceService, private router: Router) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: "" };
    this.autocompleteItems = [];
  }

  ngOnInit() {}
  updateSearchResults() {
    if (this.autocomplete.input == "") {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions(
      { input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach(prediction => {
            this.autocompleteItems.push(prediction);
          });
        });
      }
    );
  }
  selectSearchResult(item) {
    console.log(item);
    this.location = item;
    this.placeid = this.location.place_id;
    console.log("placeid" + this.placeid);
  }
  GoTo() {
    this.placeService.setGooglePlace(this.location);
    this.router.navigateByUrl('weather')
  }
}
