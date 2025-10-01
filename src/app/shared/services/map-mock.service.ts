import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MockPlace } from '../../core/models/MockPlaceData';
import { Place } from '../../core/models/Place';

@Injectable({ providedIn: 'root' })
export class MapMockService {
  constructor(private http: HttpClient) {}

getPlaceByName(name: string): Observable<MockPlace | { error: string }> {
  return this.http.get<MockPlace[]>('/assets/mock-data/places.json').pipe(
    map(data => {
      const place = data.find(
        (p) => p.name && p.name.toLowerCase() === name.toLowerCase()
      );
      return place ?? { error: 'Place not found (mock)' };
    })
  );
}
getPlacesByCategory(city: string, category: string): Observable<Place[] | { error: string }>{
  return this.http.get<Place[]>('/assets/mock-data/indian_places.json').pipe(
    map(data => {
      // Filter only entries that have both name and category
      const filtered = data.filter(p =>
        p.address && p.address.toLowerCase().includes(city.toLowerCase()) &&
        p.category && p.category.toLowerCase() === category.toLowerCase()
      );

      if (!filtered.length) {
        return { error: 'Place not found (mock)' };
      }

      return filtered;
    })
  );
}

}
