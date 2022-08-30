import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SieComponent } from './sie.component';

describe('SieComponent', () => {
  let component: SieComponent;
  let fixture: ComponentFixture<SieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
