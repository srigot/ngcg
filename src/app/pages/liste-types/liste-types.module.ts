import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeTypesComponent } from './liste-types.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTableModule, MatButtonModule, MatIconModule, MatInputModule, MatRadioModule, MatCardModule } from '@angular/material';
import { EditTypesComponent } from './edit-types/edit-types.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', component: ListeTypesComponent },
  { path: 'edit', component: EditTypesComponent },
];

@NgModule({
  declarations: [ListeTypesComponent, EditTypesComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule,
  ],
})
export class ListeTypesModule { }
