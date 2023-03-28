import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DefaultPageComponent } from './default-page/default-page.component';



@NgModule({
  declarations: [
    DefaultPageComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
  ],
  exports: [
    DefaultPageComponent
  ],
})
export class TemplatesModule { }
