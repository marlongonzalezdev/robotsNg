import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotLostDialogComponent } from './robot-lost-dialog.component';

describe('RobotLostDialogComponent', () => {
  let component: RobotLostDialogComponent;
  let fixture: ComponentFixture<RobotLostDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RobotLostDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RobotLostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
