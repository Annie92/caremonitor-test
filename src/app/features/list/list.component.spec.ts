import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent, Item } from './list.component';
import { ApiService } from '../../shared/services/api.service';
import { of, throwError } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let apiServiceMock: any;

  beforeEach(async () => {
    
    const spy = jasmine.createSpyObj('ApiService', ['getItems']);
    await TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [MatTableModule, MatCardModule],
      providers: [{ provide: ApiService, useValue: spy }]
    }).compileComponents();

    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    apiServiceSpy.getItems.and.returnValue(of([])); // Provide empty array for test
    fixture.detectChanges(); // Triggers ngOnInit
    expect(component).toBeTruthy();

  });

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
});
