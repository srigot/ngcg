import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeTypesComponent } from './liste-types.component';
import { Routes, RouterModule } from '@angular/router';
import {
  MatTableModule, MatButtonModule, MatIconModule, MatInputModule, MatRadioModule, MatCardModule,
  MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import { EditTypesComponent } from './edit-types/edit-types.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'src/app/dialog/dialog.module';


const routes: Routes = [
  { path: '', component: ListeTypesComponent },
  { path: 'new', component: EditTypesComponent },
  { path: 'edit/:id', component: EditTypesComponent },
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
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    DialogModule,
  ],
  exports: [
    RouterModule,
  ],
})
export class ListeTypesModule { }
