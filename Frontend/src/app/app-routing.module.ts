import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { QuestionnaireMainComponent } from './questionnaire/questionnaire-main/questionnaire-main.component';
import { QuestionnaireSolveComponent } from './questionnaire/questionnaire-solve/questionnaire-solve.component';
import { FailedComponent } from './questionnaire/questionnaire-failed/questionnaire-failed.component';
import { CorrectComponent } from './questionnaire/questionnaire-successful/questionnaire-successful.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionnaireMainComponent,
  },
  {
    path: 'questionnaire',
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
