import { TestBed } from '@angular/core/testing';

import { EventosServService } from './eventos-serv.service';

describe('EventosServService', () => {
  let service: EventosServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventosServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
