import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeTypesComponent } from './liste-types.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { EditTypesComponent } from './edit-types/edit-types.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'src/app/dialog/dialog.module';
import { MatMomentDateModule } from '@angular/material-moment-adapter';


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
    MatMomentDateModule,
    ReactiveFormsModule,
    DialogModule,
  ],
  exports: [
    RouterModule,
  ],
})
export class ListeTypesModule { }
