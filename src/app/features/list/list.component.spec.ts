import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { ApiService } from '../../shared/services/api.service';
import { of, throwError } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { Item } from './models/list.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ItemsStore } from './state/list.store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  let httpMock: HttpTestingController;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let apiServiceMock: any;

  beforeEach(async () => {
    
    const spy = jasmine.createSpyObj('ApiService', ['getItems']);
    await TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [MatTableModule, MatCardModule, HttpClientTestingModule],
      providers: [ItemsStore,{ provide: ApiService, useValue: spy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    apiServiceSpy.getItems.and.returnValue(of([])); // Provide empty array for test
    fixture.detectChanges(); // Triggers ngOnInit
    const req = httpMock.expectOne('/api/items');
    req.flush([]); // flush with empty list or mock data

    const component = fixture.componentInstance;
    expect(component).toBeTruthy();

  });

  /*
  it('should fetch data on init and populate dataSource', () => {
    const mockData: Item[] = [
      { id: 1, name: 'Item 1', description: 'Description 1' },
      { id: 2, name: 'Item 2', description: 'Description 2' },
    ];
    apiServiceSpy.getItems.and.returnValue(of(mockData));

    fixture.detectChanges(); // triggers ngOnInit

    expect(component.dataSource).toEqual(mockData);
  });

  it('should handle error on data fetch', () => {
    const consoleErrorSpy = spyOn(console, 'error').and.callFake(() => {});
    apiServiceSpy.getItems.and.returnValue(throwError(() => new Error('API error')));

    fixture.detectChanges();

    expect(component.dataSource).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching data:', jasmine.any(Error));
  });
  */
});
