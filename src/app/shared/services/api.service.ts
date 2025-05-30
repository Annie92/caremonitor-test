import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../../features/list/models/list.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post('/api/login', { email, password });
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>('/api/items');
  }
}
