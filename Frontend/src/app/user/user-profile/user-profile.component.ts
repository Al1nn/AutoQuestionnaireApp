import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreService } from '../../store/store.service';
import { Profile } from '../../models/IUser';
import { environment } from '../../environments/environment';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';




@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: false,
})
export class UserProfileComponent implements OnInit {

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  profile: Profile = new Profile();

  profileUrl: string | ArrayBuffer | null = null;

  profileNameForm!: FormGroup;
  profileEmailForm!: FormGroup;
  profilePasswordForm!: FormGroup;
  profilePhoneNumberForm!: FormGroup;


  profileNameFormSubmitted:boolean = false;
  profileEmailFormSubmitted:boolean = false;
  profilePasswordFormSubmitted:boolean = false
  profilePhoneNumberFormSubmitted:boolean = false;


  get oldName() {
    return this.profileNameForm.get('oldName') as FormControl;
  }

  get newName() {
    return this.profileNameForm.get('newName') as FormControl;
  }

  get oldEmail() {
    return this.profileEmailForm.get('oldEmail') as FormControl;
  }

  get newEmail() {
    return this.profileEmailForm.get('newEmail') as FormControl;
  }

  get oldPassword() {
    return this.profilePasswordForm.get('oldPassword') as FormControl;
  }

  get newPassword() {
    return this.profilePasswordForm.get('newPassword') as FormControl;
  }

  get oldPhoneNumber() {
    return this.profilePhoneNumberForm.get('oldPhoneNumber') as FormControl;
  }

  get newPhoneNumber() {
    return this.profilePhoneNumberForm.get('newPhoneNumber') as FormControl;
  }

  constructor(private store: StoreService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.store.authService.profile().subscribe((data: Profile) => {
      this.profile = data;
      if(this.profile.photo !== ""){
        this.profileUrl = environment.originalFolder + this.profile.photo
      }
    });
  }

  createForm(){
    this.profileNameForm = this.fb.group({
      oldName: ['',[Validators.required, Validators.minLength(3)]],
      newName: ['',[Validators.required, Validators.minLength(3)]]
    });
    this.profileEmailForm = this.fb.group({
      oldEmail: ['',[Validators.email, Validators.required] ],
      newEmail: ['', [Validators.email, Validators.required]]
    });
    this.profilePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]]
    });
    this.profilePhoneNumberForm = this.fb.group({
      oldPhoneNumber: ['', [Validators.pattern('^\\+?[0-9]{10,15}$'), Validators.required]],
      newPhoneNumber: ['', [Validators.pattern('^\\+?[0-9]{10,15}$'), Validators.required]]
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

  changeProfileName() {
    this.profileNameFormSubmitted = true;
    if(this.profileNameForm.valid){
      console.log("Profile Name Valid");

      this.store.authService.editProfileName(this.oldName.value, this.newName.value).subscribe(() => {


        this.store.authService.refreshToken().subscribe({
          next: () => {
            this.store.alertifyService.success("Profile name changed successfully");
            this.profile.name = this.newName.value;
            this.resetProfileNameForm();
          },
          error: () => {
            this.store.alertifyService.error("Session Expired");
            this.router.navigate(['/user/login']);
            this.store.authService.setToken(null);
            this.store.authService.setLoggedIn(false);
            this.store.authService.logoutUser().subscribe();
          }
        });


      });



    }
  }

  changeProfileEmail() {
    if(this.profileEmailForm.valid){
      console.log("Profile Email Valid");
    }
  }

  changeProfilePassword() {
    if(this.profilePasswordForm.valid){
      console.log("Profile Password Valid");
    }
  }

  changeProfilePhoneNumber() {
    if(this.profilePhoneNumberForm.valid){
      console.log("Profile Phone Number Valid");
    }
  }

  resetProfileNameForm(){
    this.profileNameFormSubmitted = false;
    this.profileNameForm.reset();
  }

  resetProfileEmailForm(){
    this.profileEmailFormSubmitted = false;
    this.profileEmailForm.reset();
  }

  resetProfilePasswordForm(){
    this.profilePasswordFormSubmitted = false;
    this.profilePasswordForm.reset();
  }

  resetProfilePhoneNumberForm(){
    this.profilePhoneNumberFormSubmitted = false;
    this.profilePhoneNumberForm.reset();
  }


}


