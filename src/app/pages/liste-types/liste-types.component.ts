import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TypeConges } from 'src/app/models/type-conges';
import { TypesService } from 'src/app/services/types.service';

@Component({
  selector: 'app-liste-types',
  templateUrl: './liste-types.component.html',
  styleUrls: ['./liste-types.component.scss'],
  standalone: false
})
export class ListeTypesComponent {
  private _typesServices = inject(TypesService);

  displayedColumns: string[] = ['nom', 'dateDebut', 'dateFin', 'nombreJours', 'joursRestants', 'actions'];
  listeTypes: Signal<TypeConges[]> = toSignal(this._typesServices.getTypesAvecRestantFiltres());
}
