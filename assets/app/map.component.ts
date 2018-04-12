import {Component, OnInit} from "@angular/core";
import * as mapboxgl from 'mapbox-gl';

@Component({
    selector: "my-map",
    styles: [`
        #map {
            box-shadow: 0 0 8px;
            padding: 0px;
            margin-top: 15px;
        }

        #marker {
            background-image: url('https://cdn3.iconfinder.com/data/icons/map-markers-1/512/repair_service-512.png');
            background-size: cover;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
        }

        .mapboxgl-popup {
            max-width: 200px;
        }
    `],
    template: `
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-offset-3 col-sm-6 text-center">
                    <h1>Vezi cereri din apropierea ta:</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-10 col-sm-offset-1" id='map' style='height: 450px;'>
                </div>
            </div>
        </div>
    `
})
export class MapComponent implements OnInit {

    map: mapboxgl.Map;
    style = 'mapbox://styles/mapbox/outdoors-v9';
    lat = 37.75;
    lng = -122.41;

    constructor(){
        mapboxgl.token = 'pk.eyJ1IjoiYW5vbmltNTAiLCJhIjoiY2o4Njl1cDFjMHV4ZDJxbzYzZW9jb2FzcCJ9.Zh5SAW3LoVIVRz-huLw7_Q';
    }

    ngOnInit() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
                this.map.flyTo({
                    center: [this.lng, this.lat]
                })
            });
        }
        this.buildMap()
        this.addMapResources();
    }

    buildMap() {
        this.map = new mapboxgl.Map({
            container: 'map',
            style: this.style,
            zoom: 13,
            center: [this.lng, this.lat]
        });


        /// Add map controls
        this.map.addControl(new mapboxgl.NavigationControl());


        //// Add Marker on Click
        this.map.on('click', (event) => {
            const coordinates = [event.lngLat.lng, event.lngLat.lat]
            console.log(coordinates);
        });
    }

    addMapResources() {
        const css = document.createElement('link');
        css.href = 'https://api.mapbox.com/mapbox-gl-js/v0.40.0/mapbox-gl.css';
        css.rel = 'stylesheet';

        const script = document.createElement('script');
        script.src = "https://api.mapbox.com/mapbox-gl-js/v0.40.0/mapbox-gl.js";

        document.head.appendChild(css);
        document.body.appendChild(script);
    }
}