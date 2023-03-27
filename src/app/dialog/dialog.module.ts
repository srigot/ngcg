import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';



@NgModule({
    declarations: [ConfirmComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
    ],
    exports: [
        ConfirmComponent,
    ]
})
export class DialogModule { }
