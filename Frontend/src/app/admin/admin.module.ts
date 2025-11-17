import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminQuestionComponent } from "./admin-question/admin-question.component";

@NgModule({
  declarations: [
    AdminRoutingModule.components
  ],
  imports: [
    AdminRoutingModule.modules,
],
  providers: [
    AdminRoutingModule.providers,
  ]
})
export class AdminModule { }
