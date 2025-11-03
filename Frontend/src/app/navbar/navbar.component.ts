import { environment } from './../environments/environment';
 import { Component, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { StoreService } from '../store/store.service';
import { map } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { IToken, IUser } from '../models/IUser';
import { Router } from '@angular/router';
import { IPhoto } from '../models/IPhoto';


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
  profilePicture$ = this.store.authService.profilePicture$;

  browserRefresh = false;

  loggedUser: IUser = null!;
  hideIcon:boolean = true;

  formData: FormData = new FormData();

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
                if(this.loggedUser.photo !== ""){
                  this.store.authService.setProfilePicture(environment.originalFolder + this.loggedUser.photo);
                }
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
      }
    });
  }


  onPhotoChanged(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.formData.set('file', file);
      this.store.authService.editProfilePicture(this.formData).subscribe((data: IPhoto) => {
        this.store.alertifyService.success("Profile picture changed successfully");
        this.store.authService.setProfilePicture(environment.originalFolder + data.photo);
      });

    }


  }
}
