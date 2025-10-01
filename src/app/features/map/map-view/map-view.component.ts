import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, ViewChild } from '@angular/core';
import {
  GoogleMap,
  MapMarker,
  MapPolyline,
  MapAdvancedMarker,
} from '@angular/google-maps';
import { MapService } from '../../../shared/services/map.service';
import { Marker } from '../../../core/models/Marker';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [GoogleMap, CommonModule, MapPolyline, MapMarker],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent {
  @ViewChild(GoogleMap) googleMapComponent!: GoogleMap;
  markers: Marker[] = [];
  tempMarker: Marker | null = null;
  path: google.maps.LatLngLiteral[] = [];
  zoom = 12;
  showPath: boolean = false;
  center: google.maps.LatLngLiteral = { lat: 23.0225, lng: 72.5714 }; // Ahmedabad

  constructor(private mapService: MapService) {
    // reactively listen to the showPath signal
    effect(() => {
      this.showPath = this.mapService.showPath(); // tracks automatically
    });
  }

  ngOnInit() {
    this.mapService.markers$.subscribe((list) => {
      this.markers = list;
      this.path = list.map((m) => m.position);
      if (this.markers.length)
        this.center = this.markers[this.markers.length - 1].position;
    });

    // 🔹 Temp marker from search
    this.mapService.tempMarker$.subscribe((marker) => {
      this.tempMarker = marker;

      if (marker) {
        this.showPath = this.mapService.showPath();
        this.center = marker.position; // center map immediately on search
        this.zoom = 20;
      }
    });
  }
  onMapReady(map: google.maps.Map) {
    this.mapService.setMapInstance(map);
  }
}
