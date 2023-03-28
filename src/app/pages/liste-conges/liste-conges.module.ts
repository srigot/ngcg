import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { DialogModule } from 'src/app/dialog/dialog.module';
import { TemplatesModule } from 'src/app/templates/templates.module';
import { ListeCongesComponent } from '../liste-conges/liste-conges.component';
import { EditComponent } from './edit/edit.component';

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
    TemplatesModule,
  ],
  exports: [
    RouterModule,
  ],
})
export class ListeCongesModule {
}
