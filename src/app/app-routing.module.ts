import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  QuizListComponent,
  QuizSingleComponent,
  QuizResultComponent
} from './components';

const routes: Routes = [
  {
    path: '',
    component: QuizListComponent
  },
  {
    path: ':id',
    component: QuizSingleComponent
  },
  {
    path: ':id/resultat',
    component: QuizResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
