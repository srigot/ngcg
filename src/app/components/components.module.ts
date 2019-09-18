import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar/avatar.component';
import { MatMenuModule, MatIconModule } from '@angular/material';



@NgModule({
  declarations: [AvatarComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
  ],
  exports: [
    AvatarComponent,
  ],
})
export class ComponentsModule { }
