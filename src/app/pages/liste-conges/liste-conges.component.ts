import { Component, inject, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { Conges } from 'src/app/models/conges';
import { CongesService } from 'src/app/services/conges.service';

interface AffichageConges extends Conges {
  totalJours: number;
}

@Component({
  selector: 'app-liste-conges',
  templateUrl: './liste-conges.component.html',
  styleUrls: ['./liste-conges.component.scss'],
  standalone: false
})
export class ListeCongesComponent implements OnInit {
  private _congesService = inject(CongesService);

  displayedColumns: string[] = ['dateDebut', 'dateFin', 'joursPris', 'actions'];
  public listeConges: Signal<AffichageConges[]>;

  constructor() {
    this.listeConges = toSignal(this._congesService.getAllConges().pipe(
      map(conges => conges.map(conge => ({ ...conge, totalJours: conge.joursPris.reduce((a, b) => a + b.nombreJours, 0) })))
    ));
  }

  ngOnInit() {
  }

}
