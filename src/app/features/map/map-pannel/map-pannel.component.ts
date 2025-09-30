import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MapService } from '../../../shared/services/map.service';
import { FormsModule } from '@angular/forms';
import { Marker } from '../../../core/models/Marker';
import { MockPlace } from '../../../core/models/MockPlaceData';

@Component({
  selector: 'app-map-pannel',
  standalone:true,
  imports: [CommonModule,FormsModule, ],
  templateUrl: './map-pannel.component.html',
  styleUrls: ['./map-pannel.component.css']
})
export class MapPannelComponent {

  searchTerm = '';
  tempMarker: Marker | null = null;
  markers: Marker[] = [];

  constructor(private mapService: MapService){
    this.mapService.markers$.subscribe((list) => (this.markers = list));
  }
  searchCity(): void {
    this.mapService.getCoordinates(this.searchTerm).subscribe({
      next: (result) => {
        if ('error' in result) {
          alert(result.error);
          this.tempMarker = null;
          return;
        }
  
        const place = result as MockPlace;
  
        // Convert MockPlace → Marker on the fly
        this.tempMarker = {
          id: place.id,
          label: '', // will assign when added
          position: { lat: place.latitude, lng: place.longitude },
          address: place.address,
          name: place.name
        };
  
       
        this.mapService.setTempMarker(this.tempMarker);
      },
      error: (err) => {
        console.error('Error fetching place:', err);
        this.tempMarker = null;
      },
    });
  }


addMarker() {
  if (this.tempMarker) {
    this.mapService.addMarker(this.tempMarker);
    this.tempMarker = null;
    this.searchTerm = '';
  }
}

// swap first two markers
swapMarkers() {
  if (this.markers.length >= 2) {
    const newOrder = [this.markers[1], this.markers[0], ...this.markers.slice(2)];
    this.mapService.reorderMarkers(newOrder);
  }
}

}
