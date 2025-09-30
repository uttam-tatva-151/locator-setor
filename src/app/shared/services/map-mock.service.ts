import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MockPlace } from '../../core/models/MockPlaceData';

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

}
