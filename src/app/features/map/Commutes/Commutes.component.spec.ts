/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommutesComponent } from './Commutes.component';

describe('CommutesComponent', () => {
  let component: CommutesComponent;
  let fixture: ComponentFixture<CommutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
