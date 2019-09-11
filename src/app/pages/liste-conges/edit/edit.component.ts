import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { CongesService } from 'src/app/services/conges.service';
import { TypeConges } from 'src/app/models/type-conges';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Conges } from 'src/app/models/conges';

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

  constructor(private fb: FormBuilder, private congesServices: CongesService, private router: Router, private route: ActivatedRoute) { }

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
    let retour: Promise<any>;
    const data: Conges = { ...this.congeForm.value, key: this.key };
    console.log(this.congeForm.value);
    if (this.modeEdition) {
      retour = this.congesServices.updateConge(data);
    } else {
      retour = this.congesServices.saveConges(data);
    }
    retour.then(() => {
      this.retourListe();
    });
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
