
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { authGuard } from '../guards/auth-guard';
import { MatTabsModule, MatTabGroup } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



const routes: Routes = [
  {
    path: 'login',
    component: UserLoginComponent,
  },
  {
    path: 'register',
    component: UserRegisterComponent,

  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'settings',
    component: UserSettingsComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class UserRoutingModule {

  static components: any[] = [
    UserLoginComponent,
    UserRegisterComponent,
    UserProfileComponent,
    UserSettingsComponent,
  ];

  static modules: any[] = [
    CommonModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
  ]
  static providers: any[] = [

  ];
}
