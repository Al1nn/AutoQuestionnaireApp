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
import { QuestionnaireService } from '../service/questionnaire.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

const routes: Routes = [
  {
      path: '',
      component: QuestionnaireMainComponent,
    },
    {
      path: 'legislation',
      component: QuestionnaireLegislationComponent,
    },
    {
      path: 'roadsigns',
      component: QuestionnaireRoadsignsComponent,
    },
    {
      path: 'questionnaires',
      component: QuestionnaireListComponent
    },
    {
      path: 'solve',
      component: QuestionnaireSolveComponent,
    },
    {
      path: 'failed',
      component: FailedComponent,

    },
    {
      path: 'correct',
      component: CorrectComponent,
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
      MatIconModule,
      MatButtonModule,
      MatCheckboxModule,
    ];

    static providers: any[] = [
      QuestionnaireService,
    ];
}
