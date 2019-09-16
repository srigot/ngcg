import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { CongesService } from 'src/app/services/conges.service';
import { TypeConges } from 'src/app/models/type-conges';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Conges } from 'src/app/models/conges';
import { CalendarService } from 'src/app/services/calendar.service';

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
  });

  private modeEdition = false;
  private key: string;

  listeTypesConges: TypeConges[];

  constructor(
    private fb: FormBuilder, private congesServices: CongesService, private router: Router, private route: ActivatedRoute,
    private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.congesServices.getAllTypes().pipe(untilDestroyed(this))
      .subscribe(liste => { this.listeTypesConges = liste; });
    if (this.isUrlModeEdition()) {
      this.modeEdition = true;
      this.key = this.route.snapshot.params.id;
      this.congesServices.getConge(this.key)
        .pipe(untilDestroyed(this))
        .subscribe(t => {
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
    const data: Conges = { ...this.congeForm.value, key: this.key };
    console.log(this.congeForm.value);
    this.mettreAJourCalendrier(data)
      .then((retour) => this.mettreAJourConge(data, retour))
      .then(() => { this.retourListe(); });
  }

  private mettreAJourConge(data: Conges, retourCalendar): Promise<any> {
    if (data.eventId == null && retourCalendar != null) {
      data.eventId = retourCalendar.result.id;
    }
    if (this.modeEdition) {
      return this.congesServices.updateConge(data);
    } else {
      return this.congesServices.saveConges(data);
    }
  }

  private mettreAJourCalendrier(data: Conges): Promise<any> {
    if (data.eventId === null) {
      return this.calendarService.insertEvent(data);
    } else {
      return this.calendarService.updateEvent(data);
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
