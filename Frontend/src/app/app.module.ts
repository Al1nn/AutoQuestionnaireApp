import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { QuestionnaireMainComponent } from './questionnaire/questionnaire-main/questionnaire-main.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { QuestionnaireSolveComponent } from './questionnaire/questionnaire-solve/questionnaire-solve.component';
import { QuestionnaireService } from './service/questionnaire.service';
import { FailedComponent } from './questionnaire/questionnaire-failed/questionnaire-failed.component';
import { CorrectComponent } from './questionnaire/questionnaire-successful/questionnaire-successful.component';
@NgModule({
  declarations: [AppComponent, QuestionnaireMainComponent, QuestionnaireSolveComponent, FailedComponent, CorrectComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideAnimationsAsync(),
    QuestionnaireService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
