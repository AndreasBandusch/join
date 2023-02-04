import { TestBed } from '@angular/core/testing';

import { OpendialogService } from './opendialog.service';

describe('OpendialogService', () => {
  let service: OpendialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpendialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
