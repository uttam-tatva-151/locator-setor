/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommutesService } from './Commutes.service';

describe('Service: Commutes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommutesService]
    });
  });

  it('should ...', inject([CommutesService], (service: CommutesService) => {
    expect(service).toBeTruthy();
  }));
});
