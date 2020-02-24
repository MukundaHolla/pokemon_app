import { TestBed } from '@angular/core/testing';

import { RestAPIService } from './rest-api.service';

describe('RestAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestAPIService = TestBed.get(RestAPIService);
    expect(service).toBeTruthy();
  });
});
