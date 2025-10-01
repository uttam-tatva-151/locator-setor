import { Place } from './../../../core/models/Place';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MapService } from '../../../shared/services/map.service';
import { FormsModule } from '@angular/forms';
import { Marker } from '../../../core/models/Marker';
import { MockPlace } from '../../../core/models/MockPlaceData';

@Component({
  selector: 'app-map-pannel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './map-pannel.component.html',
  styleUrls: ['./map-pannel.component.css'],
})
export class MapPannelComponent {
  searchTerm = '';
  tempMarker: Marker | null = null;
  markers: Marker[] = [];
  activeSection: string = 'search';
  cityName: string = '';
  selectedCategory: string = '';
  distance: number = 0;

  constructor(private mapService: MapService) {
    this.mapService.markers$.subscribe((list) => (this.markers = list));
  }

  updateDistance() {
    this.distance = this.mapService.getDistanceFromMarkers(this.markers);
  }
  toggleSection(section: string) {
    this.activeSection = this.activeSection === section ? '' : section;
  }

  searchCity(): void {
    if (!this.searchTerm.trim()) {
      alert('Please enter a search term.');
      return;
    }
    this.mapService.togglePath(false);

    this.mapService.getCoordinates(this.searchTerm).subscribe({

      next: (result) => {
        if ('error' in result) {
          alert(result.error);
          this.tempMarker = null;
          return;
        }
        const place = result as MockPlace;
        this.tempMarker = {
          id: place.id,
          label: '',
          position: { lat: place.latitude, lng: place.longitude },
          address: place.address,
          name: place.name,
        };

        this.updateDistance();
        this.mapService.setTempMarker(this.tempMarker);
      },
      error: (err) => {
        console.error('Error fetching place:', err);
        this.tempMarker = null;
      },
    });
  }

  addMarker() {
    if (!this.tempMarker) return;

    this.mapService.addMarker(this.tempMarker, false);
    this.tempMarker = null;
    this.searchTerm = '';
  }

  swapMarkers() {
    if (this.markers.length >= 2) {
      const newOrder = [
        this.markers[1],
        this.markers[0],
        ...this.markers.slice(2),
      ];
      this.mapService.reorderMarkers(newOrder);
    }
  }

  filterPlaces(category: string) {
    if (!this.cityName.trim()) {
      alert('Please enter a city name first');
      return;
    }

    this.mapService.togglePath(false);
    this.selectedCategory = category;

    this.mapService.gotFilteredPlaces(this.cityName, category).subscribe({
      next: (places) => {
        if (!places.length) {
          alert('No places found');
          return;
        }

        this.mapService.cleanList();

        places.forEach((place: Place) => {
          const marker: Marker = {
            id: place.id,
            label: place.category.charAt(0).toUpperCase(),
            position: { lat: place.latitude, lng: place.longitude },
            address: place.address,
            name: place.name,
          };
          this.mapService.addMarker(marker, true);
        });


        // this.mapService.writeList();
      },
      error: (err) => {
        console.error('Error fetching filtered places:', err);
        this.tempMarker = null;
        this.markers = [];
      },
    });
  }

  // 🔷 Shape Drawing Controls
  drawCircle() {
    this.mapService.drawCircle();
  }

  drawPolygon() {
    this.mapService.drawPolygon();
  }

  drawRectangle() {
    this.mapService.drawRectangle();
  }

  drawPolyline() {
    this.mapService.drawPolyline();
  }

  clearShapes() {
    this.mapService.clearShapes();
  }
}