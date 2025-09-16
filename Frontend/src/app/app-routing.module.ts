import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { httpErrorInterceptor } from './interceptors/httpinterceptor.interceptor';
import { StoreService } from './store/store.service';
import { authTokenInterceptor } from './interceptors/authinterceptor.interceptor';



const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./questionnaire/questionnaire.module').then(m => m.QuestionnaireModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})


export class AppRoutingModule {
  static components: any[] = [
    AppComponent,
    NavbarComponent
  ];

  static modules: any[] = [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ];

  static providers: any[] = [
    provideClientHydration(),
    provideHttpClient(withFetch(),
      withInterceptors([httpErrorInterceptor, authTokenInterceptor])),
    provideAnimations(),
    provideAnimationsAsync(),
    StoreService
  ];
}
