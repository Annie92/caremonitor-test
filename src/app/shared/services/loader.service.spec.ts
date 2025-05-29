import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit true when show() is called', (done) => {
    service.loading$.subscribe((loading) => {
      if (loading) {
        expect(loading).toBeTrue();
        done();
      }
    });
    service.show();
  });

  it('should not decrement requestCount below zero', (done) => {
    service.hide();
    service.loading$.subscribe((loading) => {
      expect(loading).toBeFalse();
      done();
    });
  });


});
