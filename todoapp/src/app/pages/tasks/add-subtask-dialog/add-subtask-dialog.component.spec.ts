import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubtaskDialogComponent } from './add-subtask-dialog.component';

describe('AddSubtaskDialogComponent', () => {
  let component: AddSubtaskDialogComponent;
  let fixture: ComponentFixture<AddSubtaskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubtaskDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubtaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
