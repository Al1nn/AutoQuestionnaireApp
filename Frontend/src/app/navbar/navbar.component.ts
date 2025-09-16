import { Component } from '@angular/core';
import { StoreService } from '../store/store.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: false
})
export class NavbarComponent {


  activeSection: 'legislation' | 'roadsigns' | 'questionnaire' | 'register' | 'login' | 'admin' | null = null;


  loggedIn$ = this.store.authService.loggedIn$;
  token$ = this.store.authService.token$;



  constructor(private store: StoreService) { }


  setActive(section: 'legislation' | 'roadsigns' | 'questionnaire' | 'register' | 'login' | 'admin'): void {
    this.activeSection = section;
  }

  logout(): void {
    this.store.authService.setToken(null);
    this.store.authService.setLoggedIn(false);
    this.store.alertifyService.message('You have been logged out');
  }



}
