import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './Main/Main.component';
import { QuestionnaireComponent } from './Questionnaire/questionnaire.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'questionnaire',
    component: QuestionnaireComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
