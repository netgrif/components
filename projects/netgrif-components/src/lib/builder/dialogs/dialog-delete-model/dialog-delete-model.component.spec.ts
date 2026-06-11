import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogDeleteModelComponent} from './dialog-delete-model.component';

describe('DialogDeleteModelComponent', () => {
  let component: DialogDeleteModelComponent;
  let fixture: ComponentFixture<DialogDeleteModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
