import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  activeSection: 'legislation' | 'roadsigns' | 'questionnaire' | 'register' | 'login' | null = null;

  setActive(section: 'legislation' | 'roadsigns' | 'questionnaire' | 'register' | 'login'): void {
    this.activeSection = section;
  }

  constructor() { }


}
