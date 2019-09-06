import { Component, OnInit } from '@angular/core';
import { CongesService } from 'src/app/services/conges.service';
import { Conges } from 'src/app/models/conges';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface AffichageConges extends Conges {
  totalJours: number;
}

@Component({
  selector: 'app-liste-conges',
  templateUrl: './liste-conges.component.html',
  styleUrls: ['./liste-conges.component.scss']
})
export class ListeCongesComponent implements OnInit {
  displayedColumns: string[] = ['dateDebut', 'dateFin', 'joursPris'];
  public listeConges: Observable<AffichageConges[]>;

  constructor(congesService: CongesService) {
    this.listeConges = congesService.getAllConges().pipe(
      map(conges => conges.map(conge => ({ ...conge, totalJours: conge.joursPris.reduce((a, b) => a + b.nombreJours, 0) })))
    );
  }

  ngOnInit() {
  }

}
