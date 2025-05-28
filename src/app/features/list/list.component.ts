import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';


export interface Item {
  id: number;
  name: string;
  description: string;
}

const ELEMENT_DATA: Item[] = [
  {id: 1, name: 'Hydrogen', description: '1.0079, symbol: H'},
  {id: 2, name: 'Helium', description: '4.0026, symbol: He'},
  {id: 3, name: 'Lithium', description: '6.941, symbol: Li'},
  {id: 4, name: 'Beryllium', description: '9.0122, symbol: Be'},
  {id: 5, name: 'Boron', description: '10.811, symbol: B'},
  {id: 6, name: 'Carbon', description: '12.0107, symbol: C'},
  {id: 7, name: 'Nitrogen', description: '14.0067, symbol: N'},
  {id: 8, name: 'Oxygen', description: '15.9994, symbol: O'},
  {id: 9, name: 'Fluorine', description: '18.9984, symbol: F'},
  {id: 10, name: 'Neon', description: '20.1797, symbol: Ne'},
];
@Component({
  selector: 'app-list',
  imports: [MatTableModule, MatCardModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  displayedColumns: string[] = ['id', 'name', 'description'];
  dataSource = ELEMENT_DATA;
}
