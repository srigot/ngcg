import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeTypesComponent } from './liste-types.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTableModule, MatButtonModule, MatIconModule } from '@angular/material';
import { EditTypesComponent } from './edit-types/edit-types.component';


const routes: Routes = [
  { path: '', component: ListeTypesComponent },
  //  { path: 'edit', component: EditComponent },
];

@NgModule({
  declarations: [ListeTypesComponent, EditTypesComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    RouterModule,
  ],
})
export class ListeTypesModule { }
