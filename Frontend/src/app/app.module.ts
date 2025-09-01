import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppRoutingModule.components
  ],
  imports: [
    AppRoutingModule.modules,
  ],
  providers: [
    AppRoutingModule.providers
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
