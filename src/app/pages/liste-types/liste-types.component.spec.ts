import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTypesComponent } from './liste-types.component';

describe('ListeTypesComponent', () => {
  let component: ListeTypesComponent;
  let fixture: ComponentFixture<ListeTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
