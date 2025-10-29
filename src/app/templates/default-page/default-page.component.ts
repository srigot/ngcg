import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-default-page',
    templateUrl: './default-page.component.html',
    styleUrls: ['./default-page.component.scss'],
    standalone: false
})
export class DefaultPageComponent {
  @Input() titre? : string;
}
