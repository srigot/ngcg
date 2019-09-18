import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametrageComponent } from './parametrage.component';
import { RouterModule, Routes } from '@angular/router';

const route: Routes = [
  { path: '', component: ParametrageComponent },
];

@NgModule({
  declarations: [ParametrageComponent],
  imports: [
    RouterModule.forChild(route),
    CommonModule
  ],
  exports: [
    RouterModule,
  ]
})
export class ParametrageModule { }
