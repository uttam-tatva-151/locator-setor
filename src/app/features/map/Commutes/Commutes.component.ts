import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommutesService } from '../../../shared/services/Commutes.service';
import { MapService } from '../../../shared/services/map.service';
import { environment } from '../../../../environments/environment';
import { MapLoaderService } from '../../../shared/services/MapLoaderService.service';

@Component({
  selector: 'app-Commutes',
  templateUrl: './Commutes.component.html',
  styleUrls: ['./Commutes.component.css']
})
export class CommutesComponent implements AfterViewInit {
  @ViewChild('mapView') mapView!: ElementRef;

  constructor(
    private commutesSvc: CommutesService,
    private mapLoader: MapLoaderService
  ) {}

  async ngAfterViewInit() {
    console.log("Hello Workes")
    // Ensure script loads first
  await this.mapLoader.load(environment.googleMapsApiKey, ['places']);

  // At this point google.maps must be defined
  if (!(window as any).google?.maps) {
    console.error('Google Maps SDK failed to load');
    return;
  }

  this.commutesSvc.initMap(this.mapView.nativeElement);
  }
}
