import { Component, NgZone, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Moment } from 'moment';
import { combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ConfirmComponent } from 'src/app/dialog/confirm/confirm.component';
import { Conges } from 'src/app/models/conges';
import { TypeConges } from 'src/app/models/type-conges';
import { CongesService } from 'src/app/services/conges.service';
import { TypesService } from 'src/app/services/types.service';

@UntilDestroy()
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  congeForm = new FormGroup({
    dateDebut: new FormControl<Moment>(null, [Validators.required]),
    dateFin: new FormControl<Moment>(null, [Validators.required]),
    joursPris: new FormArray<FormGroup<{
      type: FormControl<string>;
      nombreJours: FormControl<number>
    }>>([this.addLigneType()]),
    previsionnel: new FormControl<boolean>(false),
  });

  public modeEdition = false;
  private key: string;
  private eventId: string;

  listeTypesConges: TypeConges[];

  constructor(
    private congesServices: CongesService,
    private typesServices: TypesService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog, private zone: NgZone) { }

  ngOnInit(): void {
    combineLatest(
      [this.congeForm.get('dateDebut').valueChanges,
      this.congeForm.get('dateFin').valueChanges,
      this.typesServices.getTypesAvecRestantFiltres()]
    ).pipe(
      untilDestroyed(this),
      map(([dateDebut, dateFin, listeConges]) => {
        if (!dateDebut && !dateFin) {
          return [];
        } else {
          return listeConges.filter(typeConge => {
            const dateDebutType = typeConge.anticipable ? typeConge.dateDebut.subtract(1, 'year') : typeConge.dateDebut;
            return dateDebutType.isSameOrBefore(dateFin) && typeConge.dateFin.isSameOrAfter(dateDebut);
          });
        }
      })
    ).subscribe(liste => { this.listeTypesConges = liste; });

    if (this.isUrlModeEdition()) {
      this.modeEdition = true;
      this.key = this.route.snapshot.params.id;
      this.congesServices.getConge(this.key)
        .pipe(untilDestroyed(this),
          filter(value => !!value))
        .subscribe(t => {
          this.eventId = t.eventId;
          for (let lignes = this.congeForm.controls.joursPris.length; lignes < t.joursPris.length; lignes++) {
            this.addType();
          }
          this.congeForm.patchValue(t);
        });
    }
  }

  addLigneType() {
    return new FormGroup({
      type: new FormControl<string>(null, Validators.required),
      nombreJours: new FormControl<number>(null, Validators.required),
    });
  }

  onSubmit() {
    if (this.congeForm.invalid) {
      return;
    }
    const data: Conges = { ...this.congeForm.getRawValue(), key: this.key, eventId: this.eventId };
    this.mettreAJourConge(data)
      .then(() => {
        this.zone.run(() => {
          this.retourListe();
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '40em'
    });
    dialogRef.afterClosed().pipe(untilDestroyed(this))
      .subscribe(result => {
        if (result) {
          this.congesServices.deleteConges(this.key).then(() => {
            this.retourListe();
          });
        }
      });
  }

  close() {
    this.retourListe();
  }

  private mettreAJourConge(data: Conges): Promise<any> {
    if (this.modeEdition) {
      return this.congesServices.updateCongeWithCalendar(data);
    } else {
      return this.congesServices.saveCongesWithCalendar(data);
    }
  }

  addType() {
    const typesConges = this.congeForm.controls.joursPris;
    typesConges.push(this.addLigneType());
  }

  deleteType(i: number) {
    const typesConges = this.congeForm.controls.joursPris;
    typesConges.removeAt(i);
  }

  private isUrlModeEdition(): boolean {
    return (this.route.snapshot.url.length > 1 && this.route.snapshot.url[0].path === 'edit');
  }

  private retourListe() {
    this.router.navigate(['/conges']);
  }
}
