import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { CongesService } from 'src/app/services/conges.service';
import { TypeConges } from 'src/app/models/type-conges';
import { Router, ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Conges } from 'src/app/models/conges';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/dialog/confirm/confirm.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  congeForm = this.fb.group({
    dateDebut: [null, Validators.required],
    dateFin: [null, Validators.required],
    joursPris: this.fb.array([this.addLigneType()]),
    previsionnel: [false],
  });

  public modeEdition = false;
  private key: string;
  private eventId: string;

  listeTypesConges: TypeConges[];

  constructor(
    private fb: FormBuilder, private congesServices: CongesService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog, private zone: NgZone) { }

  ngOnInit(): void {
    this.congesServices.getAllTypes().pipe(untilDestroyed(this))
      .subscribe(liste => { this.listeTypesConges = liste; });
    if (this.isUrlModeEdition()) {
      this.modeEdition = true;
      this.key = this.route.snapshot.params.id;
      this.congesServices.getConge(this.key)
        .pipe(untilDestroyed(this))
        .subscribe(t => {
          this.eventId = t.eventId;
          for (let lignes = 1; lignes < t.joursPris.length; lignes++) {
            this.addType();
          }
          this.congeForm.patchValue(t);
        });
    }
  }

  ngOnDestroy(): void { }


  addLigneType(): FormGroup {
    return this.fb.group({
      type: [null, Validators.required],
      nombreJours: [null, Validators.required],
    });
  }

  onSubmit() {
    const data: Conges = { ...this.congeForm.value, key: this.key, eventId: this.eventId };
    console.log(this.congeForm.value);
    this.mettreAJourConge(data)
      .then(() => {
        this.zone.run(() => {
          this.retourListe();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px'
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
    const typesConges = this.congeForm.get('joursPris') as FormArray;
    typesConges.push(this.addLigneType());
  }

  deleteType(i: number) {
    const typesConges = this.congeForm.get('joursPris') as FormArray;
    typesConges.removeAt(i);
  }

  private isUrlModeEdition(): boolean {
    return (this.route.snapshot.url.length > 1 && this.route.snapshot.url[0].path === 'edit');
  }

  private retourListe() {
    this.router.navigate(['/conges']);
  }
}
