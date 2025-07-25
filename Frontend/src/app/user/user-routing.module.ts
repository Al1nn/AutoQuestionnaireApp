import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { NgModule } from '@angular/core';

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
    UserRoutingModule
  ]
  static providers: any[] = [

  ];
}
