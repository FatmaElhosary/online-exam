import { TestBed } from '@angular/core/testing';

import { GetAllSubjectsAdapter } from './get-all-subjects.service';

describe('GetAllSubjectsService', () => {
  let service: GetAllSubjectsAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllSubjectsAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
