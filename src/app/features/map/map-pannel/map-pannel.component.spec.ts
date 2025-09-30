/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MapPannelComponent } from './map-pannel.component';

describe('MapPannelComponent', () => {
  let component: MapPannelComponent;
  let fixture: ComponentFixture<MapPannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapPannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
