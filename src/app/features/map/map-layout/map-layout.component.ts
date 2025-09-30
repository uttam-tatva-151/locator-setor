import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MapViewComponent } from "../map-view/map-view.component";
import { MapPannelComponent } from "../map-pannel/map-pannel.component";

@Component({
  selector: 'app-map-layout',
  standalone: true,
  imports: [CommonModule, MapViewComponent, MapPannelComponent],
  templateUrl: './map-layout.component.html',
  styleUrls: ['./map-layout.component.css']
})
export class MapLayoutComponent {


}
