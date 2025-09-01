import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
  standalone: false
})
export class UserRegisterComponent implements OnInit {


  imageUrl: string | ArrayBuffer | null = null;
  registerationForm!: FormGroup;


  userSubmited: boolean = false;
  userData: FormData = new FormData();


  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}


  get name(){
    return this.registerationForm.get('name') as FormControl;
  }

  get email(){
    return this.registerationForm.get('email') as FormControl;
  }

  get password(){
    return this.registerationForm.get('password') as FormControl;
  }

  get confirmPassword(){
    return this.registerationForm.get('confirmPassword') as FormControl;
  }

  get phoneNumber(){
    return this.registerationForm.get('phoneNumber') as FormControl;
  }

  get role(){
    return this.registerationForm.get('role') as FormControl;
  }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['',Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{10,15}$')]],
      role: ['', Validators.required]
    },
    {
      validators: this.passwordMatchingValidator
    }
  );
  }

  passwordMatchingValidator(fc: AbstractControl){
    return fc.get('password')?.value === fc.get('confirmPassword')?.value ? null : { notMatching: true };
  }


  onAvatarSelected(event: any) {
    const file: File = event.target.files[0];
    this.userData.append('file', file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {

        this.imageUrl = e.target.result;

      };
      reader.readAsDataURL(file);
    }
    console.log(file);
  }


  user() : FormData{
    this.userData.append('name', this.name.value);
    this.userData.append('email', this.email.value);
    this.userData.append('password', this.password.value);
    this.userData.append('phoneNumber', this.phoneNumber.value);
    this.userData.append('role', this.role.value);
    return this.userData;
  }

  onSubmit() {
    this.userSubmited = true;

    if(this.registerationForm.valid) {
      this.authService.registerUser(this.user()).subscribe(
        ()=>{

          this.userData.forEach((value, key) => {
            console.log(`${key}:`, value);
          });

          this.reset();
          console.log("User registered successfully")
          this.router.navigate(['/']);


        }
      );


    }


  }

  reset(){
    this.userSubmited = false;
    this.registerationForm.reset();
    this.imageUrl = null;

    this.userData.delete('file');
    this.userData.delete('name');
    this.userData.delete('email');
    this.userData.delete('password');
    this.userData.delete('phoneNumber');
    this.userData.delete('role');
  }

}
