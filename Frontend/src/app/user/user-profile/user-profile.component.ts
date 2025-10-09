import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup, MatTabsModule } from "@angular/material/tabs";
import { StoreService } from '../../store/store.service';
import { Profile } from '../../models/IUser';
import { env } from 'process';
import { environment } from '../../environments/environment';




@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [MatTabsModule],


})
export class UserProfileComponent implements OnInit {

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  profile: Profile = new Profile();

  profileUrl: string | ArrayBuffer | null = null;

  constructor(private store: StoreService) { }

  ngOnInit() {
    this.store.authService.profile().subscribe((data: Profile) => {
      console.log(data);
      this.profile = data;
      if(this.profile.photo !== ""){
        this.profileUrl = environment.originalFolder + this.profile.photo
      }
    });
  }

  nextTab() {
    const nextIndex = this.tabGroup.selectedIndex! + 1;
    if (nextIndex < this.tabGroup._tabs.length) {
      this.tabGroup.selectedIndex = nextIndex;
    }
  }

  previousTab() {
    const prevIndex = this.tabGroup.selectedIndex! - 1;
    if (prevIndex >= 0) {
      this.tabGroup.selectedIndex = prevIndex;
    }
  }

  onPhotoChanged(event: any) {
    const file: File = event.target.files[0];
    // add to formData

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {

        this.profileUrl = e.target.result;

      };
      reader.readAsDataURL(file);
    }

    console.log("Photo Changed : " + file);
  }
}
