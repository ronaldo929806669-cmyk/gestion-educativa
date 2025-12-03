import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUsuarioComponent } from './editar-usuario.component'; // ← Cambiar aquí

describe('EditarUsuarioComponent', () => { // ← Y aquí
  let component: EditarUsuarioComponent; // ← Y aquí
  let fixture: ComponentFixture<EditarUsuarioComponent>; // ← Y aquí

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarUsuarioComponent] // ← Y aquí
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarUsuarioComponent); // ← Y aquí
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});