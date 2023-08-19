import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProblemSetComponent } from './problem-set.component';
import { ProblemsModule } from '../problems';



@NgModule({
  declarations: [
    ProblemSetComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgxPaginationModule,
    ProblemsModule,
  ]
})
export class ProblemSetModule { }
