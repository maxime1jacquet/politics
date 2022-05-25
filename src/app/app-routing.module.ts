import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuizListComponent, QuizSingleComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: QuizListComponent
  },
  {
    path: ':id',
    component: QuizSingleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
