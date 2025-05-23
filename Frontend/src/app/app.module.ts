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
import { MainComponent } from './Main/Main.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { QuestionnaireComponent } from './Questionnaire/Questionnaire.component';
import { QuestionnaireService } from './service/QuestionnaireService.service';
import { FailedComponent } from './failed/failed.component';
import { CorrectComponent } from './correct/correct.component';
@NgModule({
  declarations: [AppComponent, MainComponent, QuestionnaireComponent, FailedComponent, CorrectComponent],
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
