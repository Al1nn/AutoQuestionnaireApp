import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUserForLogin } from '../../models/IUser';
import { Router } from '@angular/router';
import { StoreService } from '../../store/store.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  standalone: false
})
export class UserLoginComponent implements OnInit {


  loginForm!: FormGroup;
  userSubmited: boolean = false;
  loginRequest: IUserForLogin = { name: '', email: '', password: '' };

  constructor(private fb: FormBuilder, private store: StoreService, private router: Router) { }


  ngOnInit() {
    this.createLoginForm();
  }

  get usernameOrEmail(){
    return this.loginForm.get('usernameOrEmail') as FormControl;
  }

  get password(){
    return this.loginForm.get('password') as FormControl;
  }


  createLoginForm() {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['',Validators.required],
      password: ['', Validators.required],
    });
  }

  userData(): IUserForLogin {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.usernameOrEmail.value);

    if (isEmail) {
        this.loginRequest.email = this.usernameOrEmail.value;
        this.loginRequest.name = '';
      } else {
        this.loginRequest.name = this.usernameOrEmail.value;
        this.loginRequest.email = '';
      }
    this.loginRequest.password = this.password.value;

    return this.loginRequest;
  }

  onSubmit() {
    this.userSubmited = true;
    console.log("Login Form Submitted");

    if (this.loginForm.valid) {

      this.store.authService.loginUser(this.userData()).subscribe(() => {
        this.store.alertifyService.success('You are logged in successfully');
        this.loginForm.reset();
        this.router.navigate(['/']);
      });




    }

  }

}
