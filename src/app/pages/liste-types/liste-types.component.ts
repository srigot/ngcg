import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeConges } from 'src/app/models/type-conges';
import { TypesService } from 'src/app/services/types.service';

@Component({
    selector: 'app-liste-types',
    templateUrl: './liste-types.component.html',
    styleUrls: ['./liste-types.component.scss'],
    standalone: false
})
export class ListeTypesComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'dateDebut', 'dateFin', 'nombreJours', 'joursRestants', 'actions'];
  listeTypes$: Observable<TypeConges[]> = this.typesServices.getTypesAvecRestantFiltres();

  constructor(private typesServices: TypesService) {
  }

  ngOnInit() {
  }

}
