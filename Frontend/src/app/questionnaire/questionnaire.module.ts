import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireRoutingModule } from './questionnaire-routing.module';


@NgModule({
  declarations: [
    QuestionnaireRoutingModule.components,
  ],
  imports: [
    QuestionnaireRoutingModule.modules,
  ],
  providers: [
    QuestionnaireRoutingModule.providers,
  ]

})
export class QuestionnaireModule {

}
