import { Component, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../shared/services/api.service';
import { ItemsStore } from './state/list.store';
import { CommonModule } from '@angular/common';
import { Item } from './models/list.model';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-list',
  imports: [CommonModule,MatTableModule, MatCardModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [ItemsStore],
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description'];
  dataSource: Item[] = [];
  // Signals
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  items = signal<Item[]>([]);
  
  constructor(private api: ApiService,private http: HttpClient,public itemStore: ItemsStore) {
    this.fetchItems();
  }
  ngOnInit() {
    this.api.getItems().subscribe(
      (data: any) => {
        this.dataSource = data as Item[];
        console.log('Data fetched successfully:', data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  fetchItems() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Item[]>('/api/items').pipe(
      catchError((err) => {
        this.error.set('Failed to load items');
        return of([]);
      }),
      finalize(() => {
        this.loading.set(false);
      })
    ).subscribe((data) => {
      this.items.set(data);
    });
  }
}
