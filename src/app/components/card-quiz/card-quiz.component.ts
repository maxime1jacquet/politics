import { Component, Input, OnInit } from '@angular/core';
import { QuizItem } from 'src/app/models/quiz.model';

@Component({
  selector: 'app-card-quiz',
  templateUrl: './card-quiz.component.html',
  styleUrls: ['./card-quiz.component.scss']
})
export class CardQuizComponent implements OnInit {
  @Input() item: QuizItem | null = null;
  @Input() categories: any;

  public percent!: number | null;

  constructor() {}

  ngOnInit() {
    this.percent = this.getPercentIfExist();
  }

  private getPercentIfExist(): number | null {
    if (this.item) {
      const data = this.getFromStorage(this.item.id);
      if (data) {
        return Math.floor(
          (data.filter((data) => data).length / data.length) * 100
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  private getFromStorage(id: string): boolean[] | null {
    const data = localStorage.getItem(`quiz-${id}`);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }
}
