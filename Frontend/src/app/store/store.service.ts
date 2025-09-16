import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { QuestionnaireService } from '../services/questionnaire.service';
import { AlertifyService } from '../services/alertify.service';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class StoreService {



  constructor(public authService: AuthService, public questionnaireService: QuestionnaireService, public alertifyService: AlertifyService) { }

}
