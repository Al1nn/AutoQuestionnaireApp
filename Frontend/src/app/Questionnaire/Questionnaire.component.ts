import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Questionnaire',
  templateUrl: './Questionnaire.component.html',
  styleUrl: './Questionnaire.component.css',
})
export class QuestionnaireComponent implements OnInit {
  public initialQuestions: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
