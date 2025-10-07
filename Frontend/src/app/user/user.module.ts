import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';




@NgModule({
  declarations: [
    UserRoutingModule.components,
  ],
  imports: [
    UserRoutingModule.modules,
  ],
  providers: [
    UserRoutingModule.providers
  ]
})
export class UserModule { }
