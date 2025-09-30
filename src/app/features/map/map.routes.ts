import { Routes } from "@angular/router";
import { MapLayoutComponent } from "./map-layout/map-layout.component";

export const mapRoutes: Routes = [
  {path:'', component: MapLayoutComponent },
  {path: '**', redirectTo:''}
];