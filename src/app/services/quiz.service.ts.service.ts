import { Injectable } from '@angular/core';
import { map, take } from 'rxjs';

import { ajax } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor() {}

  loadQuiz() {
    return ajax.get('/assets/quiz.json').pipe(map((item) => item.response));
  }
}
