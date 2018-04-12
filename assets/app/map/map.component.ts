import { Component, OnInit } from "@angular/core";

import mapboxgl = require('mapbox-gl');
import { MapService } from "./map.service";

@Component({
    selector: 'app-map',
    styles: [`
        .map {
            width: 100%; 
            height: 400px;
            box-shadow: 0 0 8px;   
        }
    `],
    templateUrl: './map.component.html'
})
export class MapComponent implements OnInit {

    map: mapboxgl.Map;
    style = 'mapbox://styles/mapbox/streets-v10';

    lat = 45.88;
    lng = 25.39;

    source: any;
    markers: any;

    constructor(private mapService: MapService) { }

    ngOnInit() {
        this.initializeMap();
    }

    initializeMap() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
                this.map.flyTo({
                    pitch: 60,
                    zoom: 13.55,
                    center: [this.lng, this.lat]
                })
            });
        }

        this.buildMap();
    }

    private buildMap() {
        this.map = new mapboxgl.Map({
            container: 'map',
            style: this.style,
            zoom: 6.5,
            center: [this.lng, this.lat]
        });

        this.map.addControl(new mapboxgl.NavigationControl());
    }
}