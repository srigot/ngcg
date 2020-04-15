import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ParametrageService } from '../../services/parametrage.service';

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
    private fb: FormBuilder,
    private parametrageService: ParametrageService,
  ) { }

  ngOnInit() {
    this.parametrageForm.setValue({ showHistorique: this.parametrageService.showHistorique });
  }

  ngOnDestroy(): void {
  }

  onSubmit(): void {

  }
}
