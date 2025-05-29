import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#login', () => {
    it('should send POST request to /api/login with email and password', () => {
      const mockEmail = 'test@example.com';
      const mockPassword = '123456';
      const mockResponse = { token: 'fake-jwt-token' };

      service.login(mockEmail, mockPassword).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('/api/login');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email: mockEmail, password: mockPassword });

      req.flush(mockResponse);
    });
  });

  describe('#getItems', () => {
    it('should send GET request to /api/items', () => {
      const mockItems = [{ id: 1, name: 'Item One', description: 'Description of Item One' }];

      service.getItems().subscribe((res) => {
        expect(res).toEqual(mockItems);
      });

      const req = httpMock.expectOne('/api/items');
      expect(req.request.method).toBe('GET');

      req.flush(mockItems);
    });
  });
});
