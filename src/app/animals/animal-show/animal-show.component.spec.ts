import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalShowComponent } from './animal-show.component';

describe('AnimalShowComponent', () => {
  let component: AnimalShowComponent;
  let fixture: ComponentFixture<AnimalShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
