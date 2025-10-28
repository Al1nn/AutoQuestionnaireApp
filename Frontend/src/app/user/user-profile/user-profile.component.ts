import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreService } from '../../store/store.service';
import { Profile } from '../../models/IUser';
import { environment } from '../../environments/environment';
import { MatTabGroup } from '@angular/material/tabs';




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

  constructor(private store: StoreService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.store.authService.profile().subscribe((data: Profile) => {
      console.log(data);
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

}
