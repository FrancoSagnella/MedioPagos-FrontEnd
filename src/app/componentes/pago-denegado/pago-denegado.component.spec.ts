import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoDenegadoComponent } from './pago-denegado.component';

describe('PagoDenegadoComponent', () => {
  let component: PagoDenegadoComponent;
  let fixture: ComponentFixture<PagoDenegadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoDenegadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoDenegadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
