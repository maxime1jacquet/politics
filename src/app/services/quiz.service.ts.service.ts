import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ajax } from 'rxjs/ajax';

import { QuizList, QuizQuestion } from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor() {}

  loadQuizList(): Observable<QuizList> {
    return ajax
      .get('/assets/quiz.json')
      .pipe(map((item) => item.response as QuizList));
  }

  loadQuizSingle(id: string): Observable<QuizQuestion[]> {
    return ajax
      .get(`/assets/quiz-${id}.json`)
      .pipe(map((item) => item.response as QuizQuestion[]));
  }
}
