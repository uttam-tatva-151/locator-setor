import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CommutesService {
  private map!: google.maps.Map;

  initMap(element: HTMLElement) {
    if (!(window as any).google?.maps) {
      throw new Error('Google Maps SDK not loaded');
    }

    this.map = new google.maps.Map(element, {
      center: { lat: 23.0225, lng: 72.5714 },
      zoom: 13,
      mapTypeControl: false,
    });
  }

  addAutocomplete(input: HTMLInputElement) {
    const autocomplete = new google.maps.places.Autocomplete(input, {
      fields: ['place_id', 'geometry', 'name'],
    });
    return autocomplete;
  }

  addMarker(position: google.maps.LatLngLiteral) {
    new google.maps.Marker({
      position,
      map: this.map,
    });
  }
}


