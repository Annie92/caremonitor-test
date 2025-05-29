import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ItemsStore } from '../state/list.store';
import { Item } from '../models/list.model';

describe('ItemsStore', () => {
  let store: ItemsStore;
  let httpMock: HttpTestingController;

  const mockItems: Item[] = [
    { id: 1, name: 'Item One', description:'Item One descr' },
    { id: 2, name: 'Item Two', description:'Item Two descr' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ItemsStore]
    });

    store = TestBed.inject(ItemsStore);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are left
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  
});
