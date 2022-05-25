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

import { QuizService } from 'src/app/services/quiz.service';

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

  public success = [
    'https://media.giphy.com/media/4xpB3eE00FfBm/giphy.gif',
    'https://media.giphy.com/media/o75ajIFH0QnQC3nCeD/giphy.gif',
    'https://media.giphy.com/media/xNBcChLQt7s9a/giphy.gif',
    'https://media.giphy.com/media/zaqclXyLz3Uoo/giphy.gif',
    'https://media.giphy.com/media/nXxOjZrbnbRxS/giphy.gif',
    'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif',
    'https://media.giphy.com/media/oGO1MPNUVbbk4/giphy.gif',
    'https://media.giphy.com/media/vtVpHbnPi9TLa/giphy.gif',
    'https://media.giphy.com/media/jpXAdNRiwGL0k/giphy.gif',
    'https://media.giphy.com/media/10ERZqYioLWJ6U/giphy.gif',
    'https://media.giphy.com/media/vViFKLAOQdDlS/giphy.gif',
    'https://media.giphy.com/media/AgrfqPt5AyiTm/giphy.gif',
    'https://media.giphy.com/media/ZpQVk25Whe1AFPY29Z/giphy.gif',
    'https://media.giphy.com/media/3o6ZsX7hXYWQP4Lwxq/giphy.gif',
    'https://media.giphy.com/media/13k4VSc3ngLPUY/giphy.gif',
    'https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif',
    'https://media.giphy.com/media/xSM46ernAUN3y/giphy.gif',
    'https://media.giphy.com/media/XR9Dp54ZC4dji/giphy.gif',
    'https://media.giphy.com/media/ma6P4l3O53uX6/giphy.gif',
    'https://media.giphy.com/media/31lPv5L3aIvTi/giphy.gif',
    'https://media.giphy.com/media/Q81NcsY6YxK7jxnr4v/giphy.gif'
  ];

  public fail = [
    'https://media.giphy.com/media/li0dswKqIZNpm/giphy.gif',
    'https://media.giphy.com/media/3o6Zt1TrXW8uW2lE2I/giphy.gif',
    'https://media.giphy.com/media/3ohs4qw8hkPShGeanS/giphy.gif',
    'https://media.giphy.com/media/Dc1w8y69enroY/giphy.gif',
    'https://media.giphy.com/media/3o72F0Tw20TgC9t720/giphy.gif',
    'https://media.giphy.com/media/nKN7E76a27Uek/giphy.gif',
    'https://media.giphy.com/media/A05Zkc18G0tb2/giphy.gif',
    'https://media.giphy.com/media/d2W7eZX5z62ziqdi/giphy.gif',
    'https://media.giphy.com/media/jsIa0hyKnzhQRDYObr/giphy.gif',
    'https://media.giphy.com/media/AAnIjZPUhrUM8/giphy.gif',
    'https://media.giphy.com/media/KmlTchPoFQT84/giphy.gif',
    'https://media.giphy.com/media/3og0IQvQkzyfxgjzLa/giphy.gif',
    'https://media.giphy.com/media/26FPyr3ZL3j1r3I2s/giphy.gif',
    'https://media.giphy.com/media/haZOqHKz9tTfW/giphy.gif',
    'https://media.giphy.com/media/YPKAxM2qNEElwJFjqi/giphy.gif'
  ];

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

  public valid(id: string, responses: string[]) {
    const userResponses = this.currentResponse$.getValue();
    const result = this.isArrayEquals(responses.sort(), userResponses.sort());
    const previousValue = this.currentForm$.getValue();
    const newValue = [...previousValue, result];

    this.registerInStorage(id, newValue);
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

  public getRandomGifSuccess(): string {
    return this.success[Math.floor(Math.random() * this.success.length)];
  }
  public getRandomGifFail(): string {
    return this.fail[Math.floor(Math.random() * this.fail.length)];
  }

  private registerInStorage(id: string, newValue: boolean[]) {
    localStorage.setItem(`quiz-${id}`, JSON.stringify(newValue));
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
