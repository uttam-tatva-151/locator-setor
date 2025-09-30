/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MapMockService } from './map-mock.service';

describe('Service: MapMock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapMockService]
    });
  });

  it('should ...', inject([MapMockService], (service: MapMockService) => {
    expect(service).toBeTruthy();
  }));
});
