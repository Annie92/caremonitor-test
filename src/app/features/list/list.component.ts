import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../shared/services/api.service';


export interface Item {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-list',
  imports: [MatTableModule, MatCardModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description'];
  dataSource: Item[] = [];
  constructor(private api: ApiService) {}
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
}
