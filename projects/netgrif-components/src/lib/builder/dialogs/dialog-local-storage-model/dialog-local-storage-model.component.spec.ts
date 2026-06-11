import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogLocalStorageModelComponent} from './dialog-local-storage-model.component';

describe('DialogLocalStorageModelComponent', () => {
  let component: DialogLocalStorageModelComponent;
  let fixture: ComponentFixture<DialogLocalStorageModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLocalStorageModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLocalStorageModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
