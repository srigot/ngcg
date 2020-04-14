import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar/avatar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';



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
