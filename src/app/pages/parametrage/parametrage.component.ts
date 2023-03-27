import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ParametrageService } from 'src/app/services/parametrage.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-parametrage',
  templateUrl: './parametrage.component.html',
  styleUrls: ['./parametrage.component.scss']
})
export class ParametrageComponent implements OnInit, OnDestroy {
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

  ngOnDestroy(): void {
  }

  onSubmit() {

  }

  showHistoriqueChange(event: MatSlideToggleChange) {
    this.parametrageService.modifyParamShowHistorique(event.checked);
  }
}
