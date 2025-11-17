import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { CommonModule } from "@angular/common";
import { MatTabsModule } from "@angular/material/tabs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminUserComponent } from "./admin-user/admin-user.component";
import { AdminQuestionnaireComponent } from "./admin-questionnaire/admin-questionnaire.component";
import { AdminQuestionComponent } from "./admin-question/admin-question.component";
import { AdminAnswerComponent } from "./admin-answer/admin-answer.component";
import { AdminSolvedQuestionnaireComponent } from "./admin-solved-questionnaire/admin-solved-questionnaire.component";
import { AdminLegislationComponent } from "./admin-legislation/admin-legislation.component";
import { AdminRoadSignComponent } from "./admin-road-sign/admin-road-sign.component";


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
    AdminUserComponent,
    AdminQuestionnaireComponent,
    AdminQuestionComponent,
    AdminAnswerComponent,
    AdminSolvedQuestionnaireComponent,
    AdminLegislationComponent,
    AdminRoadSignComponent
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
