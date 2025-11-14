import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { CommonModule } from "@angular/common";
import { MatTabsModule } from "@angular/material/tabs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    data: { breadcrumb: 'Admin' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class AdminRoutingModule {
  static components: any[] = [
    AdminComponent,
  ];

  static modules: any[] = [
    CommonModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
  ]

  static providers: any[] = [
  ]
};
