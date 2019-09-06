import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { CongesService } from 'src/app/services/conges.service';
import { TypeConges } from 'src/app/models/type-conges';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  congeForm = this.fb.group({
    dateDebut: [null, Validators.required],
    dateFin: [null, Validators.required],
    joursPris: this.fb.array([this.addLigneType()]),
  });

  listeTypesConges: Observable<TypeConges[]>;

  constructor(private fb: FormBuilder, private congesServices: CongesService) { }

  ngOnInit(): void {
    this.listeTypesConges = this.congesServices.getAllTypes();
  }

  addLigneType(): FormGroup {
    return this.fb.group({
      type: [null, Validators.required],
      nombreJours: [null, Validators.required],
    });
  }

  onSubmit() {
    alert('Thanks!');
  }

  addType() {
    const typesConges = this.congeForm.get('joursPris') as FormArray;
    typesConges.push(this.addLigneType());
  }

  deleteType(i: number) {
    const typesConges = this.congeForm.get('joursPris') as FormArray;
    typesConges.removeAt(i);
  }

}
