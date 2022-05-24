import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { QuizService } from '../../services/quiz.service.ts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public result$!: Observable<any>;

  public activeCategories$ = new BehaviorSubject<number[]>([1]);

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.result$ = this.quizService.loadQuiz().pipe(tap());
  }

  public onChangeFilter(categories: number[]) {
    this.activeCategories$.next(categories);
  }

  public filter(activeCategorie: any[], currentCategorie: any[]): boolean {
    if (activeCategorie?.length > 0 && activeCategorie[0] !== 1) {
      const test = [...activeCategorie].some((item) =>
        [...currentCategorie].includes(item)
      );
      return test;
    } else {
      return true;
    }
  }
}
