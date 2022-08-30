import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDecidirComponent } from './form-decidir.component';

describe('FormDecidirComponent', () => {
  let component: FormDecidirComponent;
  let fixture: ComponentFixture<FormDecidirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDecidirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDecidirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
