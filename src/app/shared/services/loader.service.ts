import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loadingCounter = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  show(): void {
    this.loadingCounter++;
    if (this.loadingCounter === 1) {
      this.loadingSubject.next(true);
    }
  }

  hide(): void {
    if (this.loadingCounter > 0) {
      this.loadingCounter--;
    }
    if (this.loadingCounter === 0) {
      this.loadingSubject.next(false);
    }
  }
}

