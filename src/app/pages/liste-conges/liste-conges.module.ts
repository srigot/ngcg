import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeCongesComponent } from '../liste-conges/liste-conges.component';
import { RouterModule, Routes } from '@angular/router';
import {
  MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule, MatSortModule, MatDatepickerModule,
  MatDialogModule, MatSlideToggleModule
} from '@angular/material';
import { EditComponent } from './edit/edit.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'src/app/dialog/dialog.module';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

const routes: Routes = [
  { path: '', component: ListeCongesComponent },
  { path: 'new', component: EditComponent },
  { path: 'edit/:id', component: EditComponent },
];

@NgModule({
  declarations: [
    ListeCongesComponent,
    EditComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatDialogModule,
    DialogModule,
    MatSlideToggleModule,
  ],
  exports: [
    RouterModule,
  ],
})
export class ListeCongesModule {
}
