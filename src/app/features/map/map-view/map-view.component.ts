import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { GoogleMap, MapMarker, MapPolyline, MapAdvancedMarker, MapInfoWindow } from '@angular/google-maps';
import { MapService } from '../../../shared/services/map.service';
import { Marker } from '../../../core/models/Marker';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [GoogleMap, CommonModule, MapPolyline, MapMarker, MapInfoWindow],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent {
  @ViewChild(GoogleMap) googleMapComponent!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  markers: Marker[] = [];
  tempMarker: Marker | null = null;
  path: google.maps.LatLngLiteral[] = [];
  zoom = 12;
  showPath: boolean = false;
  center: google.maps.LatLngLiteral = { lat: 23.0225, lng: 72.5714 }; // Ahmedabad
  selectedMarkerInfo: string = '';

  constructor(private mapService: MapService) {
    // reactively listen to the showPath signal
    effect(() => {
      this.showPath = this.mapService.showPath(); // tracks automatically
    });
  }
  openInfoWindow(markerData: Marker) {
    if (!markerData || !this.googleMapComponent) return;

    const nativeInfoWindow = new google.maps.InfoWindow({
      content: this.markerToParagraph(markerData),
      position: markerData.position, // LatLngLiteral
      pixelOffset: new google.maps.Size(0, -30),
    });

    nativeInfoWindow.open(this.googleMapComponent.googleMap); // open directly on map
  }
  openTempMarkerInfo() {
    if (!this.tempMarker || !this.googleMapComponent) return;
    const nativeInfoWindow = new google.maps.InfoWindow({
      content: this.markerToParagraph(this.tempMarker),
      position: this.tempMarker.position, // LatLngLiteral
      pixelOffset: new google.maps.Size(0, -30),
    });

    nativeInfoWindow.open(this.googleMapComponent.googleMap); // native map instance
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
  markerToParagraph(marker: Marker | null): string {
    if (!marker || !marker.position) return 'Marker data not available';

    return `


<div style="
      font-family: 'Segoe UI', Roboto, Arial, sans-serif;
      padding: 15px;
      max-width: 280px;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%);
      border: 1px solid #e0e0e0;
    ">
      <h3 style="
        margin: 0 0 8px 0;
        font-size: 18px;
        color: #2c3e50;
        border-bottom: 1px solid #ddd;
        padding-bottom: 5px;
      ">
        ${marker.name}
      </h3>
      <p style="margin: 0; font-size: 14px; color: #34495e; line-height: 1.5;">
        <strong>ID:</strong> ${marker.id}<br>
        <strong>Latitude:</strong> ${marker.position.lat.toFixed(5)}<br>
        <strong>Longitude:</strong> ${marker.position.lng.toFixed(5)}<br>
        <strong>Address:</strong> ${marker.address || 'N/A'}
      </p>
    </div>

  `
    // return `Marker of "${marker.name}" (ID: ${marker.id}) is located at latitude ${marker.position.lat}, longitude ${marker.position.lng} on this address: ${marker.address}.`;
  }

}
