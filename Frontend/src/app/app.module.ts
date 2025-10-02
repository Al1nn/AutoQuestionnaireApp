import {  NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    AppRoutingModule.components
  ],
  imports: [
    AppRoutingModule.modules,
],
  providers: [
    AppRoutingModule.providers,
    provideHotToastConfig(),

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
