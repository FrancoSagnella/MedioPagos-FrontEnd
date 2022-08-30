import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMercadoPagoComponent } from './form-mercado-pago.component';

describe('FormMercadoPagoComponent', () => {
  let component: FormMercadoPagoComponent;
  let fixture: ComponentFixture<FormMercadoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMercadoPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMercadoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
