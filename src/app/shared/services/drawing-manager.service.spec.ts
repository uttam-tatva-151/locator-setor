/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DrawingManagerService } from './drawing-manager.service';

describe('Service: DrawingManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrawingManagerService]
    });
  });

  it('should ...', inject([DrawingManagerService], (service: DrawingManagerService) => {
    expect(service).toBeTruthy();
  }));
});
