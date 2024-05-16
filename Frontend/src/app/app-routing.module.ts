import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './Main/Main.component';
import { QuestionnaireComponent } from './Questionnaire/Questionnaire.component';
import { FailedComponent } from './failed/failed.component';
import { CorrectComponent } from './correct/correct.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'questionnaire',
    component: QuestionnaireComponent,
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
