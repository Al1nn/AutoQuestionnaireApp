import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path: 'register',
    component: UserRegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class UserRoutingModule {

  static components: any[] = [
    UserLoginComponent,
    UserRegisterComponent
  ];

  static modules: any[] = [
    UserRoutingModule,
    ReactiveFormsModule,
    CommonModule
  ]
  static providers: any[] = [

  ];
}
