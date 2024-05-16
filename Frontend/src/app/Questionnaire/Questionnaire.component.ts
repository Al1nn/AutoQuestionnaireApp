import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, takeWhile, timer } from 'rxjs';
import { QuestionnaireService } from '../service/QuestionnaireService.service';

@Component({
  selector: 'app-Questionnaire',
  templateUrl: './Questionnaire.component.html',
  styleUrl: './Questionnaire.component.css',
})
export class QuestionnaireComponent implements OnInit {
  public initialQuestions: number = 0;
  public remainingQuestions: number = 0;
  public wrongAnswers: number = 1;
  public correctAnswers: number = 1;

  seconds = 5;

  timeRemaining = '00:00:00';

  constructor(
    private questionnaireService: QuestionnaireService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.questionnaireService.getQuestions().subscribe((data) => {
    //   console.log(data);
    // });

    this.startTimer();
  }

  startTimer() {
    const source = timer(0, 1000); // Emits incrementing numbers every second
    source
      .pipe(
        map((second) => this.seconds - second), // Calculate remaining seconds
        takeWhile((remainingTime) => remainingTime >= 0) // Complete when remainingTime < 0
      )
      .subscribe((remainingTime) => {
        if (remainingTime <= 0) {
          this.timeRemaining = '00:00:00'; // Set timeRemaining to '00:00:00' when timer reaches zero
          this.router.navigate(['/failed']);
        } else {
          const hours = Math.floor(remainingTime / 3600);
          const minutes = Math.floor((remainingTime % 3600) / 60);
          const seconds = remainingTime % 60;

          this.timeRemaining = `${this.formatTime(hours)}:${this.formatTime(
            minutes
          )}:${this.formatTime(seconds)}`;
        }
      });
  }

  formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }
}
