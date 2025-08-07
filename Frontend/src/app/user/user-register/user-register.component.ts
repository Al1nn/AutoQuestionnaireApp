import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {


  imageUrl: string | ArrayBuffer | null = null;
  registerationForm!: FormGroup;


  userSubmited: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {

  }


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

  createRegisterForm() { // Initialize the form with controls and their default values
    this.registerationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['',Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{10,15}$')]], // Example pattern for phone number
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


  onAvatarSelected(event: any) { // Handle the file input change event
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // e.target.result contains the Data URL
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    console.log(file);
  }

  onSubmit() {
    this.userSubmited = true; // Set the flag to true when the form is submitted

    if(this.registerationForm.valid) {

      console.log(this.registerationForm.value);

      this.registerationForm.reset();
      this.imageUrl = null;

      this.router.navigate(['/']); // Navigate to the login page after successful registration



    }


  }

}
