import { Component, OnInit } from '@angular/core';
import { CongesService } from 'src/app/services/conges.service';
import { Observable } from 'rxjs';
import { TypeConges } from 'src/app/models/type-conges';

@Component({
  selector: 'app-liste-types',
  templateUrl: './liste-types.component.html',
  styleUrls: ['./liste-types.component.scss']
})
export class ListeTypesComponent implements OnInit {
  displayedColumns: string[] = ['dateDebut', 'dateFin', 'nom', 'nombreJours', 'actions'];
  listeTypes: Observable<TypeConges[]>;

  constructor(congesService: CongesService) {
    this.listeTypes = congesService.getAllTypes();
  }

  ngOnInit() {
  }

}
