import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [ConfirmComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  entryComponents: [
    ConfirmComponent,
  ],
  exports: [
    ConfirmComponent,
  ],
})
export class DialogModule { }
