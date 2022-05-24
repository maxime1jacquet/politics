import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-quiz',
  templateUrl: './card-quiz.component.html',
  styleUrls: ['./card-quiz.component.scss']
})
export class CardQuizComponent implements OnInit {
  @Input() item: any;
  @Input() categories: any;

  constructor() {}

  ngOnInit() {}
}
