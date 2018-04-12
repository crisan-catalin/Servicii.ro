import { Component, OnInit } from "@angular/core";

import { MapService } from "./map.service";

@Component({
    selector: 'app-mapbox',
    styles: [`
    agm-map {
        height: 300px;
      }

      box-shadow: 0 0 8px;
    `],
    templateUrl: './mapbox.component.html'
})
export class MapBoxComponent implements OnInit {

    lat: number = 51.678418;
    lng: number = 7.809007;
    zoomLevel = 14;

    constructor(private mapService: MapService) {
    }

    ngOnInit() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
            });
        }
    }

}