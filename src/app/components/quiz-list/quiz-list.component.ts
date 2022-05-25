import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { QuizService } from '../../services/quiz.service';
import { QuizList } from '../../models/quiz.model';

@Component({
  selector: 'quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
  public result$!: Observable<QuizList>;

  public activeCategories$ = new BehaviorSubject<number[]>([1]);

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.result$ = this.quizService.loadQuizList();
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
