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
  input: any;
  constructor(public zone: NgZone, private placeService: PlaceService, private router: Router) {

  }

  ngOnInit() {}
  
  GoTo() {
    this.placeService.setPlace(this.input);
    this.router.navigateByUrl('weather')
  }
}
