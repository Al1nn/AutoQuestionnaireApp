import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { httpErrorInterceptor } from './interceptors/httpinterceptor.interceptor';
import { StoreService } from './store/store.service';
import { authTokenInterceptor } from './interceptors/authinterceptor.interceptor';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';




const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./questionnaire/questionnaire.module').then(m => m.QuestionnaireModule),
    data: { breadcrumb: 'DRPCIV' }
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    data: { breadcrumb: 'DRPCIV' }
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})


export class AppRoutingModule {
  static components: any[] = [
    AppComponent,
    NavbarComponent,
    BreadcrumbComponent
  ];

  static modules: any[] = [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
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
