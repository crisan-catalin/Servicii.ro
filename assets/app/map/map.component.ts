import { Component, OnInit, Input } from "@angular/core";

import * as mapboxgl from 'mapbox-gl';
import { MapService } from "./map.service";
import { CategoryFilterMapControl } from "./category-filter.mapbox.control";
import { CategoryService } from "../ad/category.service";
import { AdService } from "../ad/ad.service";
import { Router } from "@angular/router";

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

    private map: mapboxgl.Map;
    private categoryFilterMapControl: CategoryFilterMapControl;
    private markers = new Array();

    @Input() lat = 45.7757836;
    @Input() lng = 24.1427365;
    @Input() isUsedForReviews: boolean = false;

    //TODO: Calculate circle radius based on user distance range
    @Input() userRange: number = 0;


    constructor(private mapService: MapService, private categoryService: CategoryService, private adService: AdService, private router: Router) { }

    ngOnInit() {
        this.initializeMap();
    }

    initializeMap() {
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v10',
            zoom: 6.5,
            center: [this.lng, this.lat]
        });

        this.buildMap();
    }

    private buildMap() {
        this.map.on('load', () => {
            if (this.isUsedForReviews) {
                this.disableMapInteraction();

                this.map.flyTo({
                    pitch: 0,
                    zoom: 10,
                    center: [this.lng, this.lat]
                });

                this.map.addLayer({
                    'id': 'urban-areas-fill',
                    'type': 'circle',
                    'source': {
                        'type': 'geojson',
                        'data': {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [this.lng, this.lat]
                            }
                        }
                    },
                    'layout': {},
                    'paint': {
                        'circle-radius': 120,
                        'circle-color': 'rgba(55,148,179,0.7)',
                        'circle-stroke-width': 2
                    }
                });
            } else {
                // if (navigator.geolocation) {
                //     navigator.geolocation.getCurrentPosition(position => {
                //         this.lat = position.coords.latitude;
                //         this.lng = position.coords.longitude;
                //         this.map.flyTo({
                //             pitch: 60,
                //             zoom: 13.55,
                //             center: [this.lng, this.lat]
                //         });
                //     });
                // }

                this.map.flyTo({
                    pitch: 60,
                    zoom: 13.55,
                    center: [this.lng, this.lat]
                });

                this.addControls();

                this.categoryService.getCategories()
                    .subscribe(
                        data => {
                            this.categoryFilterMapControl.setCategories(data.result);
                        }
                    );

                this.adService.getAdsRangeForCoords(this.lat, this.lat)
                    .subscribe(
                        data => {
                            this.createMarkersForAds(data.result);
                        }
                    );
            }
        });
    }

    private disableMapInteraction() {
        this.map.scrollZoom.disable();
        this.map.boxZoom.disable();
        this.map.dragRotate.disable();
        this.map.dragPan.disable();
        this.map.keyboard.disable();
        this.map.doubleClickZoom.disable();
        this.map.touchZoomRotate.disable();
    }

    private hideAllMarkersExcept(markerCategoryName: string){
        this.markers.forEach(element => {
            let DOMElement =  element.getElement()
            if(DOMElement.classList.contains(markerCategoryName)) {
                DOMElement.hidden = false;
            } else {
                DOMElement.hidden = true;
            }
        });
    }

    private createMarkersForAds(ads) {
        for (const ad of ads) {
            if (ad.location != undefined) {
                this.createMarker(ad.id, ad.categoryName, ad.title, ad.description, ad.location.lat, ad.location.lng);
            }
        }
    }

    private createMarker(adId, categoryName: string, title: string, description, lat: Number, lng: Number) {
        var markerElement = document.createElement('img');
        markerElement.className = 'marker ';
        markerElement.className += categoryName;
        markerElement.src = this.setMarkerImageFor(categoryName);

        let router = this.router;
        var anchorElement = document.createElement('a');
        anchorElement.innerText = "Vezi detalii";
        anchorElement.addEventListener('click', function () {
            router.navigate(['/anunturi', categoryName, adId]);
        }, false);

        var anchorContainer = document.createElement('p');
        anchorContainer.style.textAlign = "right";
        anchorContainer.style.paddingRight = "20px;";
        anchorContainer.appendChild(anchorElement);

        var popupElement = document.createElement('div');
        popupElement.innerHTML = '<h3>' + title + '</h3><p>' + description + '</p>';
        popupElement.appendChild(anchorContainer);

        var popup = new mapboxgl.Popup()
            .setLngLat([lng, lat])
            .setDOMContent(popupElement);

        let map = this.map;
        let marker = new mapboxgl.Marker(markerElement)
            .setLngLat([lng, lat])
            .setPopup(popup)
            .addTo(map);
            
        this.markers.push(marker);
    }

    private addControls() {
        this.categoryFilterMapControl = new CategoryFilterMapControl(this.map, null, null);
        this.categoryFilterMapControl.categoryChangedEventEmitter.on('category-changed', (selectedCategory) => {
            this.hideAllMarkersExcept(selectedCategory);
        });

        this.map.addControl(this.categoryFilterMapControl);
        this.map.addControl(new mapboxgl.NavigationControl());
    }

    private setMarkerImageFor(categoryName: string): string {
        switch (categoryName) {
            case "IT": return "https://i.imgur.com/gQDg8A2.png"
            case "Instalator": return "https://i.imgur.com/G9Jmmba.png"
            case "Electrician": return "https://i.imgur.com/lrn8unm.png"
            case "Tamplar": return "https://i.imgur.com/quy0JPc.png"
            case "Vopsitor": return "https://i.imgur.com/zda6rMD.png"
            case "Transport marfa": return "https://i.imgur.com/ZbChTOu.png"
            case "Menajera": return "https://i.imgur.com/zli8vaG.png"
            case "Animale": return "https://i.imgur.com/eYLJCdm.png"
            case "Deratizare": return "https://i.imgur.com/2quIrLn.png"
            default: return "https://i.imgur.com/gQDg8A2.png"
        }
    }

    //TODO: Use it when update map markers
    private isSameMarker(first: mapboxgl.Marker, second: mapboxgl.Marker): Boolean {
        if (first._lngLat.lat == second._lngLat.lat && first._lngLat.lng == second._lngLat.lng) {
            return true;
        }

        return first._popup._container.innerText == second._popup._container.innerText;
    }
}