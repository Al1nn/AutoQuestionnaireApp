 import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { StoreService } from '../store/store.service';
import { catchError, map } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: false
})
export class NavbarComponent implements OnInit{


  activeSection: 'legislation' | 'roadsigns' | 'questionnaire' | 'register' | 'login' | 'admin' | null = null;


  loggedIn$ = this.store.authService.loggedIn$;
  token$ = this.store.authService.token$;
  browserRefresh = false;


  constructor(@Inject(PLATFORM_ID) private platformId: Object, private store: StoreService) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.browserRefresh = this.checkIfBrowserReloaded();

      if (this.browserRefresh) {
        console.log('Browser was reloaded!');


        this.store.authService.refreshToken().subscribe(); // Calling this
      } else {
        console.log('Normal navigation (not a reload).');
      }
    }
  }


  private checkIfBrowserReloaded(): boolean {
    const entries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    return entries.length > 0 && entries[0].type === 'reload';
  }

  setActive(section: 'legislation' | 'roadsigns' | 'questionnaire' | 'register' | 'login' | 'admin'): void {
    this.activeSection = section;
  }



  logout(): void {
    this.store.authService.logoutUser().subscribe({
      next: () => {
        this.store.authService.setToken(null);
        this.store.authService.setLoggedIn(false);
        this.store.alertifyService.message('You have been logged out');
      }
    });
  }





}
