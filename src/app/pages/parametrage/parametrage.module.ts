import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametrageComponent } from './parametrage.component';
import { RouterModule, Routes } from '@angular/router';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
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
