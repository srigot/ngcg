import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypesComponent } from './edit-types.component';

describe('EditTypesComponent', () => {
  let component: EditTypesComponent;
  let fixture: ComponentFixture<EditTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
