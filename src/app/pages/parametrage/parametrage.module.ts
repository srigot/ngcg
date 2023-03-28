import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametrageComponent } from './parametrage.component';
import { RouterModule, Routes } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';

const route: Routes = [
  { path: '', component: ParametrageComponent },
];

@NgModule({
  declarations: [ParametrageComponent],
  imports: [
    RouterModule.forChild(route),
    CommonModule,
    MatSlideToggleModule,
    MatListModule,
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class ParametrageModule { }
