import { Routes } from "@angular/router";
import { MapLayoutComponent } from "./map-layout/map-layout.component";
import { CommutesComponent } from "./Commutes/Commutes.component";

export const mapRoutes: Routes = [
  {path:'', component: MapLayoutComponent },
  {path:'commutes', component: CommutesComponent},
  {path: '**', redirectTo:''}
];