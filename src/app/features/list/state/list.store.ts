
import { Injectable, computed, effect, signal } from '@angular/core';
// import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, finalize, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiService } from '../../../shared/services/api.service';
import { Item } from '../models/list.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ItemsStore {
  loading = signal(false);
  error = signal<string | null>(null);
  items = signal<Item[]>([]);

  constructor(private http: HttpClient) {}

  fetchItems() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Item[]>('/api/items').pipe(
      catchError((err) => {
        this.error.set('Failed to load items');
        return of([]);
      }),
      finalize(() => this.loading.set(false))
    ).subscribe((data) => this.items.set(data));
  }
}

