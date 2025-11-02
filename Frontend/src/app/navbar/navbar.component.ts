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


  loggedIn$ = this.store.authService.loggedIn$;
  token$ = this.store.authService.token$;
  browserRefresh = false;

  loggedUser: IUser = null!;
  hideIcon:boolean = true;

  profileUrl: string | ArrayBuffer | null = null;
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
                  this.profileUrl = environment.originalFolder + this.loggedUser.photo;
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
    // add to formData

    //call the request to change photo here

    if (file) {
      this.formData.set('file', file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    console.log("Photo Changed : " + file);
  }
}
