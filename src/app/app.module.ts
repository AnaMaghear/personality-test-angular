import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import { StartCardComponent } from './components/start-card/start-card.component';
import {MatCardModule} from "@angular/material/card";
import { QuestionsComponent } from './components/questions/questions.component';
import { QuestionComponent } from './components/question/question.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { ResultCardComponent } from './components/result-card/result-card.component';

@NgModule({
  declarations: [
    AppComponent,
    StartCardComponent,
    QuestionsComponent,
    QuestionComponent,
    ResultCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
