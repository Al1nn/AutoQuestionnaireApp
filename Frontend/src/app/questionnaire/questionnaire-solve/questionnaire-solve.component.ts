import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, takeWhile, timer } from 'rxjs';
import { QuestionnaireService } from '../../service/questionnaire.service';

@Component({
  selector: 'app-questionnaire-solve',
  templateUrl: './questionnaire-solve.component.html',
  styleUrl: './questionnaire-solve.component.css',
  standalone: false,
})
export class QuestionnaireSolveComponent implements OnInit {
  public initialQuestions: number = 0;
  public remainingQuestions: number = 0;
  public wrongAnswers: number = 1;
  public correctAnswers: number = 1;

  seconds = 10;

  timeRemaining = '00:00:05';

  private timerSubscription: any;

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

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  startTimer() {
    const source = timer(0, 1000);
    this.timerSubscription = source
      .pipe(
        map((second) => this.seconds - second),
        takeWhile((remainingTime) => remainingTime >= 0)
      )
      .subscribe((remainingTime) => {
        if (remainingTime <= 0) {
          if (this.router.url === '/solve') {
            this.timeRemaining = '00:00:00';
            this.router.navigate(['/failed']);
          } else {
            this.seconds = 10;
            this.startTimer();
          }
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
