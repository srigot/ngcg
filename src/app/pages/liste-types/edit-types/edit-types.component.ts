import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ConfirmComponent } from 'src/app/dialog/confirm/confirm.component';
import { TypeConges } from 'src/app/models/type-conges';
import { TypesService } from 'src/app/services/types.service';

@UntilDestroy()
@Component({
  selector: 'app-edit-types',
  templateUrl: './edit-types.component.html',
  styleUrls: ['./edit-types.component.scss']
})
export class EditTypesComponent implements OnInit {
  typeForm = this.fb.group({
    dateDebut: [null],
    dateFin: [null],
    nom: [null, Validators.required],
    nombreJours: [null, [Validators.required, Validators.min(1)]],
  });

  public modeEdition = false;
  private key: string;

  constructor(
    private fb: UntypedFormBuilder, private route: ActivatedRoute, private router: Router, private typesServices: TypesService,
    private dialog: MatDialog) { }

  ngOnInit() {
    if (this.isUrlModeEdition()) {
      this.modeEdition = true;
      this.key = this.route.snapshot.params.id;
      this.typesServices.getType(this.key)
        .pipe(untilDestroyed(this))
        .subscribe(t => {
          this.typeForm.patchValue(t);
        });
    }
  }

  onSubmit() {
    let retour: Promise<any>;
    const data: TypeConges = { ...this.typeForm.value, key: this.key };
    if (this.modeEdition) {
      retour = this.typesServices.updateType(data);
    } else {
      retour = this.typesServices.saveType(data);
    }
    retour.then(() => {
      this.retourListe();
    });
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().pipe(untilDestroyed(this))
      .subscribe(result => {
        if (result) {
          this.typesServices.deleteType(this.key).then(() => {
            this.retourListe();
          });
        }
      });
  }

  close() {
    this.retourListe();
  }

  private isUrlModeEdition(): boolean {
    return (this.route.snapshot.url.length > 1 && this.route.snapshot.url[0].path === 'edit');
  }

  private retourListe() {
    this.router.navigate(['/types']);
  }

}
