import { environment } from './../environments/environment';
 import { Component, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { StoreService } from '../store/store.service';
import { map } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { IToken, IUser } from '../models/IUser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: false
})
export class NavbarComponent implements OnInit{



  activeSection: 'legislation' | 'roadsigns' | 'questionnaire' | 'register' | 'login' | 'admin' | null = null;
  userPhotoUrl = environment.imageFolder;

  loggedIn$ = this.store.authService.loggedIn$;
  token$ = this.store.authService.token$;
  browserRefresh = false;

  loggedUser: IUser = null!;
  dropdownOpen = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private store: StoreService, private router: Router) { }



  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.store.authService.refreshToken().subscribe();
      console.log('NavbarComponent initialized on the browser');
    }
    this.loggedIn$.pipe(
      map(loggedIn => {
        if(loggedIn){

          this.token$.pipe(
            map ( (token: IToken | null) => {
              if(token){
                this.loggedUser = this.store.authService.decodeToken(token);

              }
            })
          ).subscribe();


        }
      }))
      .subscribe();


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
        this.router.navigate(['/']);
        this.dropdownOpen = false;
      }
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event): void {
      const target = event.target as HTMLElement;
      const dropdownElement = document.getElementById('dropdownMenu');
      const dropdownButton = event.target as HTMLElement;

      // Check if click is outside dropdown and not on the dropdown button
      if (this.dropdownOpen &&
          dropdownElement &&
          !dropdownElement.contains(target) &&
          !dropdownButton.closest('button')?.contains(target)) {
        this.dropdownOpen = false;
      }
    }

}
