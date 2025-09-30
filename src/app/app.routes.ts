import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { MapLayoutComponent } from './features/map/map-layout/map-layout.component';
import { mapRoutes } from './features/map/map.routes';

export const routes: Routes = [
  { path: '', children: mapRoutes },
  { path: '**', redirectTo: '' }
];
