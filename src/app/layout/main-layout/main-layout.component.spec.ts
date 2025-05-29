import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MainLayoutComponent } from './main-layout.component';
import { Router, RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { of, Subject } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { LoaderService } from '../../shared/services/loader.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterTestingModule } from '@angular/router/testing';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
  let mockRouter: any;
  let mockAuthService: any;
  let mockLoaderService: any;
  let loadingSubject: Subject<boolean>;

  beforeEach(async () => {
    loadingSubject = new Subject<boolean>();

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    mockAuthService = {
      logout: jasmine.createSpy('logout')
    };

    mockLoaderService = {
      loading$: loadingSubject.asObservable()
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [RouterTestingModule.withRoutes([]),CommonModule, SharedModule, MatProgressSpinnerModule, ],
      providers: [
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  
});
