import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() categories: any;
  @Input() activeCategories!: number[];
  @Output() active: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public toogle(key: any) {
    // const categories: number[] = [...this.activeCategories];
    // const index = categories.indexOf(+key);

    // if (index === -1) {
    //   categories.push(+key);
    // } else {
    //   categories.splice(index, 1);
    // }

    this.active.emit([+key]);
  }

  existInActiveCategories(key: any): boolean {
    const categories: number[] = [...this.activeCategories];
    const index = categories.indexOf(+key);
    return index !== -1;
  }
}
