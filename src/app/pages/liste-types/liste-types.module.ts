import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { TemplatesModule } from 'src/app/templates/templates.module';
import { EditTypesComponent } from './edit-types/edit-types.component';
import { ListeTypesComponent } from './liste-types.component';
import { ConfirmComponent } from 'src/app/dialog/confirm/confirm.component';


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
    MatSlideToggleModule,
    ReactiveFormsModule,
    ConfirmComponent,
    TemplatesModule,
  ],
  exports: [
    RouterModule,
  ],
})
export class ListeTypesModule { }
