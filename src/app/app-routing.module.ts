import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartCardComponent} from "./components/start-card/start-card.component";
import {QuestionsComponent} from "./components/questions/questions.component";
import {ResultCardComponent} from "./components/result-card/result-card.component";

const routes: Routes = [
  {
    path: 'home',
    component: StartCardComponent,
  },
  {
    path: 'questions',
    component: QuestionsComponent,
  },
  {
    path: 'result',
    component: ResultCardComponent,
  },
  {
    path: '**',
    component: StartCardComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
