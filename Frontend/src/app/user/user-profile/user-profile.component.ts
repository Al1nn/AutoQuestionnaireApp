import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from "@angular/material/tabs";




@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [MatTabsModule],


})
export class UserProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
