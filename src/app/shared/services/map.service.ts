import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { MapMockService } from './map-mock.service';
import { Marker } from '../../core/models/Marker';
import { Place } from '../../core/models/Place';

@Injectable({ providedIn: 'root' })
export class MapService {
  private markers: Marker[] = [];
  private markersSubject = new BehaviorSubject<Marker[]>([]);
  markers$ = this.markersSubject.asObservable(); // observable for real-time updates
  private tempMarkerSubject = new BehaviorSubject<Marker | null>(null);
  tempMarker$ = this.tempMarkerSubject.asObservable();
  private _showPath: WritableSignal<boolean> = signal(false);

  constructor(private http: HttpClient, private mockDataAPI: MapMockService) {}

  getCoordinates(cityName: string): Observable<any> {
    if (environment.useGoogleApi) {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        cityName
      )}&key=${environment.googleMapsApiKey}`;
      return this.http.get<any>(url);
    }
    return this.mockDataAPI.getPlaceByName(cityName);
  }
  gotFilteredPlaces(city: string, category: string): Observable<any> {
    if (environment.useGoogleApi) {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        city
      )}&key=${environment.googleMapsApiKey}`;
      return this.http.get<any>(url).pipe(
        map((response) => {
          // Convert Google API response to MockPlace[] format
          // Here we assume each result has geometry.location
          return response.results.map((r: any, idx: number) => ({
            id: idx,
            name: r.formatted_address,
            city: city,
            category: category,
            latitude: r.geometry.location.lat,
            longitude: r.geometry.location.lng,
            address: r.formatted_address,
          }));
        })
      );
    }
    return this.mockDataAPI.getPlacesByCategory(city, category);
  }
  setTempMarker(marker: Marker | null) {
    this.tempMarkerSubject.next(marker);
  }
  addMarker(marker: Marker, isLabeled: boolean) {
    if (!isLabeled) {
      marker.label = (this.markers.length + 1).toString();
    }
    this.markers.push(marker);
    this.markersSubject.next([...this.markers]); // emit updated list
  }
  cleanList() {
    this.markers = [];
    this.markersSubject.next([]); // emit empty list
  }
  writeList() {
    console.log(this.markers);
  }
  reorderMarkers(newOrder: Marker[]) {
    this.markers = newOrder.map((m, i) => ({
      ...m,
      label: (i + 1).toString(),
    }));
    this.markersSubject.next([...this.markers]);
  }
  get showPath() {
    return this._showPath;
  }
  togglePath(isShow: boolean) {
    this._showPath.set(isShow);
  }

  // Shape management
  private shapes: (
    | google.maps.Circle
    | google.maps.Polygon
    | google.maps.Rectangle
    | google.maps.Polyline
  )[] = [];
  private mapInstance: google.maps.Map | null = null;

  // Call this from MapViewComponent after map is initialized
  setMapInstance(map: google.maps.Map) {
    this.mapInstance = map;
  }

  // Draw Circle around map center
  drawCircle() {
    if (!this.mapInstance) return;

    const center = this.mapInstance.getCenter();
    if (!center) return;
    const circle = new google.maps.Circle({
      center: center.toJSON(),
      radius: 3000,
      map: this.mapInstance,
      fillColor: '#FF0000',
      fillOpacity: 0.3,
      strokeColor: '#FF0000',
      strokeWeight: 2,
    });
    this.shapes.push(circle);
  }

  // Draw Polygon around center
  drawPolygon() {
    if (!this.mapInstance) return;

    const center = this.mapInstance.getCenter();
    if (!center) return;
    const lat = center.lat();
    const lng = center.lng();

    const polygon = new google.maps.Polygon({
      paths: [
        { lat: lat + 0.01, lng: lng - 0.01 },
        { lat: lat + 0.01, lng: lng + 0.01 },
        { lat: lat - 0.01, lng: lng + 0.01 },
        { lat: lat - 0.01, lng: lng - 0.01 },
      ],
      map: this.mapInstance,
      fillColor: '#00FF00',
      fillOpacity: 0.3,
      strokeColor: '#00FF00',
      strokeWeight: 2,
    });

    this.shapes.push(polygon);
  }

  // Draw Rectangle using current bounds
  drawRectangle() {
    if (!this.mapInstance) return;

    const bounds = this.mapInstance.getBounds();
    if (!bounds) return;

    const rectangle = new google.maps.Rectangle({
      bounds: bounds,
      map: this.mapInstance,
      fillColor: '#0000FF',
      fillOpacity: 0.2,
      strokeColor: '#0000FF',
      strokeWeight: 2,
    });

    this.shapes.push(rectangle);
  }

  // Draw Polyline from center outward
  drawPolyline() {
    if (!this.mapInstance) return;

    const center = this.mapInstance.getCenter();
    if (!center) return;
    const lat = center.lat();
    const lng = center.lng();
    const path = [
      { lat: lat, lng: lng },
      { lat: lat + 0.01, lng: lng + 0.01 },
      { lat: lat + 0.02, lng: lng },
    ];

    const polyline = new google.maps.Polyline({
      path,
      map: this.mapInstance,
      strokeColor: '#FFA500',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    this.shapes.push(polyline);
  }

  // Clear all drawn shapes
  clearShapes() {
    this.shapes.forEach((shape) => shape.setMap(null));
    this.shapes = [];
  }
}
