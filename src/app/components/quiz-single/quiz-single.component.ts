import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  map,
  mergeMap,
  Observable,
  pluck,
  withLatestFrom
} from 'rxjs';
import { QuizItem, QuizQuestion } from 'src/app/models/quiz.model';

import { QuizService } from 'src/app/services/quiz.service.ts.service';

@Component({
  selector: 'quiz-single',
  templateUrl: './quiz-single.component.html',
  styleUrls: ['./quiz-single.component.scss']
})
export class QuizSingleComponent implements OnInit {
  public id$!: Observable<string>;
  public result$!: Observable<QuizItem>;
  public questions$!: Observable<QuizQuestion[]>;

  public currentQuestion$ = new BehaviorSubject(0);
  public currentForm$ = new BehaviorSubject<boolean[]>([]);
  public currentStatus$ = new BehaviorSubject<number>(0);
  public currentResponse$ = new BehaviorSubject<string[]>([]);

  constructor(
    private quizService: QuizService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id$ = this.activatedRoute.params.pipe(pluck('id'));
    this.result$ = this.quizService.loadQuizList().pipe(
      withLatestFrom(this.id$),
      map(([{ data }, id]) => data?.filter((item) => item.id === id)[0])
    );
    this.questions$ = this.id$.pipe(
      mergeMap((id) => this.quizService.loadQuizSingle(id))
    );
  }

  public checkboxChange(e: MatCheckboxChange) {
    const value = this.currentResponse$.getValue();
    const newValue = e.checked
      ? [...value, e.source.value]
      : value.filter((item) => item !== e.source.value);

    this.currentResponse$.next(newValue);
  }

  public valid(responses: string[]) {
    const userResponses = this.currentResponse$.getValue();
    const result = this.isArrayEquals(responses.sort(), userResponses.sort());
    const previousValue = this.currentForm$.getValue();
    const newValue = [...previousValue, result];

    this.currentForm$.next(newValue);

    if (result) {
      this.currentStatus$.next(1);
    } else {
      this.currentStatus$.next(2);
    }
  }

  public next(id: number) {
    // GO TO NEXT AND RESET OBSERVABLES
    this.currentQuestion$.next(id + 1);
    this.currentStatus$.next(0);
    this.currentResponse$.next([]);
  }

  private isArrayEquals(a: string[], b: string[]): boolean {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  }
}
