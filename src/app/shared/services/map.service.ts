import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { MapMockService } from './map-mock.service';
import { Marker } from '../../core/models/Marker';

@Injectable({ providedIn: 'root' })
export class MapService {
  private markers: Marker[] = [];
  private markersSubject = new BehaviorSubject<Marker[]>([]);
  markers$ = this.markersSubject.asObservable(); // observable for real-time updates
  private tempMarkerSubject = new BehaviorSubject<Marker | null>(null);
  tempMarker$ = this.tempMarkerSubject.asObservable();


  constructor(private http: HttpClient, private mockDataAPI : MapMockService) {}

  getCoordinates(cityName: string): Observable<any> {
    // const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(cityName)}&key=${environment.googleMapsApiKey}`;
    // return this.http.get<any>(url);
    return this.mockDataAPI.getPlaceByName(cityName);
  }
  setTempMarker(marker: Marker | null) {
    this.tempMarkerSubject.next(marker);
  }
  addMarker(marker: Marker) {
    marker.label = (this.markers.length + 1).toString();
    this.markers.push(marker);
    this.markersSubject.next([...this.markers]); // emit updated list
  }
  reorderMarkers(newOrder: Marker[]) {
    this.markers = newOrder.map((m, i) => ({ ...m, label: (i + 1).toString() }));
    this.markersSubject.next([...this.markers]);
  }
}
