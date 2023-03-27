import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar/avatar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';



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
