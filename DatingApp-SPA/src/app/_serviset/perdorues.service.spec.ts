/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PerdoruesService } from './perdorues.service';

describe('Service: Perdorues', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerdoruesService]
    });
  });

  it('should ...', inject([PerdoruesService], (service: PerdoruesService) => {
    expect(service).toBeTruthy();
  }));
});
