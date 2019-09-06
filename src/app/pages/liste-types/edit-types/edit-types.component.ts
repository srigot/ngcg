import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    nombreJours: [null, Validators.required],
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    alert('OK');
  }

}
