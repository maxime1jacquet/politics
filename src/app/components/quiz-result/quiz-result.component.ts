import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, Observable, pluck } from 'rxjs';
import { QuizQuestion } from 'src/app/models/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent implements OnInit {
  public id$!: Observable<string>;
  public result$!: Observable<boolean[]>;
  public percent$!: Observable<number>;
  public questions$!: Observable<QuizQuestion[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit() {
    this.id$ = this.activatedRoute.params.pipe(pluck('id'));
    this.result$ = this.id$.pipe(map((id) => this.getFromStorage(id)));
    this.questions$ = this.id$.pipe(
      mergeMap((id) => this.quizService.loadQuizSingle(id))
    );
    this.percent$ = this.result$.pipe(
      map((item) => {
        return Math.floor(
          (item.filter((item) => item).length / item.length) * 100
        );
      })
    );
  }

  private getFromStorage(id: string): boolean[] {
    const data = localStorage.getItem(`quiz-${id}`);
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  }
}
