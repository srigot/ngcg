import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';



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
