/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MapLoaderServiceService } from './MapLoaderService.service';

describe('Service: MapLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapLoaderServiceService]
    });
  });

  it('should ...', inject([MapLoaderServiceService], (service: MapLoaderServiceService) => {
    expect(service).toBeTruthy();
  }));
});
