import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionnaireMainComponent } from './questionnaire-main/questionnaire-main.component';
import { QuestionnaireLegislationComponent } from './questionnaire-legislation/questionnaire-legislation.component';
import { QuestionnaireRoadsignsComponent } from './questionnaire-roadsigns/questionnaire-roadsigns.component';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';
import { QuestionnaireSolveComponent } from './questionnaire-solve/questionnaire-solve.component';
import { FailedComponent } from './questionnaire-failed/questionnaire-failed.component';
import { CorrectComponent } from './questionnaire-successful/questionnaire-successful.component';
import { FooterComponent } from '../footer/footer.component';
import { QuestionnaireService } from '../services/questionnaire.service';


const routes: Routes = [
  {
      path: '',
      component: QuestionnaireMainComponent,
      data: { breadcrumb: 'Welcome' }
    },
    {
      path: 'legislation',
      component: QuestionnaireLegislationComponent,
      data: { breadcrumb: 'Legislation' }
    },
    {
      path: 'roadsigns',
      component: QuestionnaireRoadsignsComponent,
      data: { breadcrumb: 'Road Signs' }
    },
    {
      path: 'questionnaires',
      component: QuestionnaireListComponent,
      data: { breadcrumb: 'Questionnaires' }
    },
    {
      path: 'solve',
      component: QuestionnaireSolveComponent,
       data: { breadcrumb: null }
    },
    {
      path: 'failed',
      component: FailedComponent,
      data: { breadcrumb: null }
    },
    {
      path: 'correct',
      component: CorrectComponent,
      data: { breadcrumb: null }
    },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class QuestionnaireRoutingModule {
  static components: any[] = [
      QuestionnaireMainComponent,
      QuestionnaireLegislationComponent,
      QuestionnaireRoadsignsComponent,
      QuestionnaireListComponent,
      QuestionnaireSolveComponent,
      FailedComponent,
      CorrectComponent,
      FooterComponent,
    ];

    static modules: any[] = [
      QuestionnaireRoutingModule,
    ];

    static providers: any[] = [
      QuestionnaireService,
    ];
}
