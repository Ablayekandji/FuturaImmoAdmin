import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaisonVenteComponent } from './maison-vente.component';

describe('MaisonVenteComponent', () => {
  let component: MaisonVenteComponent;
  let fixture: ComponentFixture<MaisonVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaisonVenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaisonVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
