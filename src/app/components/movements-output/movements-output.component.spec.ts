import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsOutputComponent } from './movements-output.component';

describe('MovementsOutputComponent', () => {
  let component: MovementsOutputComponent;
  let fixture: ComponentFixture<MovementsOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovementsOutputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
