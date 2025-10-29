import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ParametrageService } from 'src/app/services/parametrage.service';

@Component({
    selector: 'app-parametrage',
    templateUrl: './parametrage.component.html',
    styleUrls: ['./parametrage.component.scss'],
    standalone: false
})
export class ParametrageComponent implements OnInit {
  parametrageForm = this.fb.group({
    showHistorique: [null],
  });
  constructor(
    private fb: UntypedFormBuilder,
    private parametrageService: ParametrageService,
  ) { }

  ngOnInit() {
    this.parametrageService.showHistorique$.subscribe(
      showHistorique => {
        this.parametrageForm.setValue({ showHistorique });
      }
    );
  }

  onSubmit() {
    // DO NOTHING
  }

  showHistoriqueChange(event: MatSlideToggleChange) {
    this.parametrageService.modifyParamShowHistorique(event.checked);
  }
}
