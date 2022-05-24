import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxCursorModule } from 'ngx-cursor';

import * as fromComponents from './components/index';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { QuizService } from './services/quiz.service.ts.service';

@NgModule({
  declarations: [...fromComponents.component],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxCursorModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [fromComponents.AppComponent],
})
export class AppModule {}
